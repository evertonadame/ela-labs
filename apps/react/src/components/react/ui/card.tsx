import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        border: "1px solid #eee",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}
