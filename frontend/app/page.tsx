"use client";

import React, { useEffect, useState, FormEvent } from "react";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

type EmployeeInfo = {
  id: number;
  first_name: string;
  designation: string | null;
};

type AttendanceToday =
  | {
    id: number;
    employee_id: number;
    date: string;
    check_in: string | null;
    check_out: string | null;
    status: string;
    created_at: string;
  }
  | null;

export default function HomePage() {
  // ---------- AUTH STATE ----------
  const [token, setToken] = useState<string | null>(null);
  const [employee, setEmployee] = useState<EmployeeInfo | null>(null);

  // ---------- LOGIN FORM ----------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // ---------- REGISTER FORM ----------
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regDesignation, setRegDesignation] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  // ---------- ATTENDANCE STATE ----------
  const [attendance, setAttendance] = useState<AttendanceToday>(null);
  const [attendanceMessage, setAttendanceMessage] = useState<string | null>(
    null
  );
  const [attendanceError, setAttendanceError] = useState<string | null>(null);
  const [attendanceLoading, setAttendanceLoading] = useState(false);

  // Restore auth from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedToken = localStorage.getItem("hrmsToken");
    const savedEmployee = localStorage.getItem("hrmsEmployee");

    if (savedToken) setToken(savedToken);
    if (savedEmployee) {
      try {
        const parsed: EmployeeInfo = JSON.parse(savedEmployee);
        setEmployee(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  // Load today's attendance when token changes
  useEffect(() => {
    if (token) {
      loadTodayAttendance(token);
    } else {
      setAttendance(null);
      setAttendanceMessage(null);
      setAttendanceError(null);
    }
  }, [token]);

  // ---------- LOGIN ----------
  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Login failed");
        return;
      }

      const authToken = data.token as string;
      const emp: EmployeeInfo = {
        id: data.employee.id,
        first_name: data.employee.first_name,
        designation: data.employee.designation ?? null,
      };

      setToken(authToken);
      setEmployee(emp);

      if (typeof window !== "undefined") {
        localStorage.setItem("hrmsToken", authToken);
        localStorage.setItem("hrmsEmployee", JSON.stringify(emp));
      }

      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Network error during login");
    } finally {
      setLoginLoading(false);
    }
  }

  // ---------- REGISTER ----------
  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);
    setRegLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: regFirstName,
          last_name: regLastName,
          email: regEmail,
          designation: regDesignation,
          username: regUsername,
          password: regPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setRegError(data.error || "Failed to register employee");
        return;
      }

      setRegSuccess("Employee registered successfully. They can now log in.");
    } catch (err) {
      console.error("Register error:", err);
      setRegError("Network error during registration");
    } finally {
      setRegLoading(false);
    }
  }

  // ---------- ATTENDANCE ----------
  async function loadTodayAttendance(authToken: string) {
    try {
      setAttendanceLoading(true);
      setAttendanceError(null);
      setAttendanceMessage(null);

      const res = await fetch("http://localhost:5000/api/attendance/today", {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setAttendanceError(data.error || "Failed to load attendance");
        return;
      }

      if (data.message) {
        setAttendance(null);
        setAttendanceMessage(data.message);
      } else {
        setAttendance(data);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setAttendanceError("Network error while loading attendance");
    } finally {
      setAttendanceLoading(false);
    }
  }

  async function handleCheckIn() {
    if (!token) {
      setAttendanceError("You must be logged in");
      return;
    }

    try {
      setAttendanceError(null);
      setAttendanceMessage(null);

      const res = await fetch(
        "http://localhost:5000/api/attendance/check-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setAttendanceError(data.error || "Check-in failed");
        return;
      }

      setAttendanceMessage(data.message || "Checked in successfully");
      await loadTodayAttendance(token);
    } catch (err) {
      console.error("Check-in error:", err);
      setAttendanceError("Network error during check-in");
    }
  }

  async function handleCheckOut() {
    if (!token) {
      setAttendanceError("You must be logged in");
      return;
    }

    try {
      setAttendanceError(null);
      setAttendanceMessage(null);

      const res = await fetch(
        "http://localhost:5000/api/attendance/check-out",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setAttendanceError(data.error || "Check-out failed");
        return;
      }

      setAttendanceMessage(data.message || "Checked out successfully");
      await loadTodayAttendance(token);
    } catch (err) {
      console.error("Check-out error:", err);
      setAttendanceError("Network error during check-out");
    }
  }

  function handleLogout() {
    setToken(null);
    setEmployee(null);
    setAttendance(null);
    setAttendanceError(null);
    setAttendanceMessage(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("hrmsToken");
      localStorage.removeItem("hrmsEmployee");
    }
  }

  function formatTime(value: string | null) {
    if (!value) return "-";
    const date = new Date(value);
    return date.toLocaleTimeString();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        background:
          "linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 40%, #fff 100%)",
      }}
    >
      <main
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "32px 16px 40px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          color: "#111827",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 28 }}>TiaMed HRMS</h1>
            <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: 14 }}>
              Employee Registration, Login & Attendance
            </p>
          </div>
          {employee && (
            <div style={{ textAlign: "right", fontSize: 14 }}>
              <div style={{ fontWeight: 600 }}>Hi, {employee.first_name}</div>
              <div style={{ color: "#6b7280" }}>
                {employee.designation || "Employee"}
              </div>
            </div>
          )}
        </header>

        {/* If NOT logged in → show Login + Register side by side */}
        {!token ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: 20,
              marginTop: 16,
            }}
          >
            {/* LOGIN CARD (now component) */}
            <LoginCard
              username={username}
              password={password}
              loading={loginLoading}
              error={loginError}
              onUsernameChange={setUsername}
              onPasswordChange={setPassword}
              onSubmit={handleLogin}
            />

            {/* REGISTER CARD (still inline for now) */}
            <RegisterCard
              firstName={regFirstName}
              lastName={regLastName}
              email={regEmail}
              designation={regDesignation}
              username={regUsername}
              password={regPassword}
              loading={regLoading}
              error={regError}
              success={regSuccess}
              onFirstNameChange={setRegFirstName}
              onLastNameChange={setRegLastName}
              onEmailChange={setRegEmail}
              onDesignationChange={setRegDesignation}
              onUsernameChange={setRegUsername}
              onPasswordChange={setRegPassword}
              onSubmit={handleRegister}
            />

          </div>
        ) : (
          // ================= LOGGED-IN DASHBOARD =================
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.1fr)",
              gap: 20,
              marginTop: 16,
            }}
          >
            {/* Profile Card */}
            <section
              style={{
                padding: 20,
                borderRadius: 16,
                backgroundColor: "#ffffff",
                boxShadow:
                  "0 10px 25px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  Profile
                </h2>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#f9fafb",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
              <p style={{ margin: "6px 0", fontSize: 14 }}>
                <span style={{ fontWeight: 500 }}>Name:</span>{" "}
                {employee?.first_name}
              </p>
              <p style={{ margin: "4px 0", fontSize: 14 }}>
                <span style={{ fontWeight: 500 }}>Role:</span>{" "}
                {employee?.designation || "Employee"}
              </p>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "#6b7280" }}>
                Use this dashboard to mark your daily attendance.
              </p>
            </section>

            {/* Attendance Card */}
            <section
              style={{
                padding: 20,
                borderRadius: 16,
                backgroundColor: "#ffffff",
                boxShadow:
                  "0 10px 25px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: 10,
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Today&apos;s Attendance
              </h2>
              <p style={{ marginTop: 0, fontSize: 13, color: "#6b7280" }}>
                Click <strong>Check In</strong> when you arrive and{" "}
                <strong>Check Out</strong> before leaving.
              </p>

              <div style={{ margin: "10px 0 14px" }}>
                <button
                  onClick={handleCheckIn}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#16a34a",
                    color: "white",
                    fontSize: 13,
                    fontWeight: 600,
                    marginRight: 8,
                    cursor: "pointer",
                  }}
                >
                  Check In
                </button>
                <button
                  onClick={handleCheckOut}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#f97316",
                    color: "white",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Check Out
                </button>
              </div>

              {attendanceLoading ? (
                <p style={{ fontSize: 13 }}>Loading today&apos;s data...</p>
              ) : attendanceError ? (
                <p style={{ color: "#b91c1c", fontSize: 13 }}>
                  {attendanceError}
                </p>
              ) : (
                <>
                  {attendanceMessage && (
                    <p style={{ fontSize: 13 }}>{attendanceMessage}</p>
                  )}
                  {attendance && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: "#f9fafb",
                        border: "1px dashed #e5e7eb",
                        fontSize: 13,
                      }}
                    >
                      <p style={{ margin: "4px 0" }}>
                        <span style={{ fontWeight: 500 }}>Date:</span>{" "}
                        {attendance.date}
                      </p>
                      <p style={{ margin: "4px 0" }}>
                        <span style={{ fontWeight: 500 }}>Check In:</span>{" "}
                        {formatTime(attendance.check_in)}
                      </p>
                      <p style={{ margin: "4px 0" }}>
                        <span style={{ fontWeight: 500 }}>Check Out:</span>{" "}
                        {formatTime(attendance.check_out)}
                      </p>
                      <p style={{ margin: "4px 0" }}>
                        <span style={{ fontWeight: 500 }}>Status:</span>{" "}
                        {attendance.status}
                      </p>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
