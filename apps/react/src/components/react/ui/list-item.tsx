export function ListItem({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div>
      {subtitle && (
        <div style={{ color: "#666", fontSize: 14 }}>{subtitle}</div>
      )}
    </div>
  );
}
