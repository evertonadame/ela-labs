export function ButtonRow({
  buttons,
}: {
  buttons: { label: string; onClick?: () => void }[];
}) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
