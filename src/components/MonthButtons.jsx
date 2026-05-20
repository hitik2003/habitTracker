import { useHabit } from "../context/HabitContext";

export function MonthButtons() {
   
  const { currentMonth, nextMonth, previousMonth } = useHabit();

  return (
    <div className="flex items-center gap-3 mb-6 dark:bg-primary-dark dark:border-button-dark dark:text-dark">
      <button
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition dark:bg-primary-dark
         dark:border-button-dark dark:text-dark"
        aria-label="Previous"
        onClick={previousMonth}
      >
        ←
      </button>

      <span className="font-semibold dark:text-white">{currentMonth.format("MMMM YYYY")}</span>

      <button
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition dark:bg-primary-dark
         dark:border-button-dark dark:text-dark"
        aria-label="Next"
        onClick={nextMonth}
      >
        →
      </button>
    </div>
  );
}