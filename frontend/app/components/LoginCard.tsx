// app/components/LoginCard.tsx
import React, { FormEvent } from "react";

type LoginCardProps = {
  username: string;
  password: string;
  loading: boolean;
  error: string | null;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
};

export default function LoginCard({
  username,
  password,
  loading,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: LoginCardProps) {
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
        Employee Login
      </h2>
      <p style={{ marginTop: 0, marginBottom: 16, color: "#6b7280" }}>
        Existing employees can log in to mark their daily attendance.
      </p>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label
            style={{
              display: "block",
              marginBottom: 4,
              fontSize: 14,
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
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              marginBottom: 4,
              fontSize: 14,
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
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 999,
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? "Logging in..." : "Login"}
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
    </section>
  );
}
