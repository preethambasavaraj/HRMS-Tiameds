// app/components/RegisterCard.tsx
import React, { FormEvent } from "react";

type RegisterCardProps = {
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  username: string;
  password: string;
  loading: boolean;
  error: string | null;
  success: string | null;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onDesignationChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
};

export default function RegisterCard({
  firstName,
  lastName,
  email,
  designation,
  username,
  password,
  loading,
  error,
  success,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onDesignationChange,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: RegisterCardProps) {
  return (
    <section
      style={{
        padding: 24,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        boxShadow:
          "0 10px 25px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04)",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 8,
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        Register New Employee
      </h2>
      <p style={{ marginTop: 0, marginBottom: 16, color: "#6b7280" }}>
        Use this form to add a new employee with login access.
      </p>

      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 4,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "7px 9px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 13,
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 4,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              style={{
                width: "100%",
                padding: "7px 9px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 13,
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label
            style={{
              display: "block",
              marginBottom: 4,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "7px 9px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 13,
            }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label
            style={{
              display: "block",
              marginBottom: 4,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Designation
          </label>
          <input
            type="text"
            value={designation}
            onChange={(e) => onDesignationChange(e.target.value)}
            placeholder="e.g. Developer, HR, Manager"
            style={{
              width: "100%",
              padding: "7px 9px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 13,
            }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label
            style={{
              display: "block",
              marginBottom: 4,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "7px 9px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 13,
            }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              display: "block",
              marginBottom: 4,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "7px 9px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 13,
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "9px 11px",
            borderRadius: 999,
            border: "none",
            backgroundColor: "#10b981",
            color: "white",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            opacity: loading ? 0.85 : 1,
          }}
        >
          {loading ? "Registering..." : "Register Employee"}
        </button>
      </form>

      {error && (
        <p
          style={{
            color: "#b91c1c",
            marginTop: 10,
            fontSize: 13,
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            color: "#15803d",
            marginTop: 10,
            fontSize: 13,
          }}
        >
          {success}
        </p>
      )}
    </section>
  );
}
