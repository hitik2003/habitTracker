export function StatsCard({ title, value, subtitle }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        dark:bg-sidebar-dark
        dark:border-lines-dark
      "
    >
      <p className="text-sm text-gray-500 dark:text-text-secondary">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold dark:text-dark">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-400 dark:text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}