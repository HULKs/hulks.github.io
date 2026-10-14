const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatLastPush(timestamp, now = Date.now()) {
  if (!timestamp) return "—";

  const pushedAt = new Date(timestamp);
  const current = new Date(now);
  if (!Number.isFinite(pushedAt.getTime()) || !Number.isFinite(current.getTime())) {
    return "—";
  }

  const elapsed = Math.max(0, current - pushedAt);
  const minute = 60_000;
  const hour = 60 * minute;

  if (elapsed < minute) return "Just now";
  if (elapsed < hour) return `${Math.floor(elapsed / minute)}m ago`;
  if (elapsed < 24 * hour) return `${Math.floor(elapsed / hour)}h ago`;

  const yesterday = new Date(current);
  yesterday.setDate(yesterday.getDate() - 1);
  if (pushedAt.toDateString() === yesterday.toDateString()) return "Yesterday";

  return dateFormatter.format(pushedAt);
}
