export function formatDate(dateSring: string): string {
  return new Date(dateSring).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
