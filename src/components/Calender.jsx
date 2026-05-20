import { MonthButtons } from "./MonthButtons";
import { useHabit } from "../context/HabitContext";
import dayjs from "dayjs";

export function Calendar() {
  const { currentMonth,habits,completedHabits } = useHabit();

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const today = dayjs().date()

  const firstDayOfMonth = currentMonth.startOf("month")
  const daysInMonth = currentMonth.daysInMonth();

  const firstDay = firstDayOfMonth.day();
  const startDay = firstDay === 0 ? 6 : firstDay-1;

  const cells = []

  for (let i = 0 ;i < startDay ; i++){
    cells.push(null)
  }

  for (let i = 1 ; i<=daysInMonth;i++){
    cells.push(i)
  }



  return (
    <div className="p-2">
      <MonthButtons />

      <div className="grid grid-cols-7 text-center mb-2 opacity-50 dark:bg-primary-dark dark:border-lines-dark dark:text-dark">
        {weekDays.map((day) => (
          <div key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {

            if (!day) {
          return <div key={index}></div>;
        }

        // create date string
        const dateKey = currentMonth.date(day).format("YYYY-MM-DD");

        // completed habits count
        const doneCount = completedHabits[dateKey]?.length || 0;
            return (
              <div
                key={index}
                className={`border rounded-[8px] p-2 border-gray-200 dark:border-lines-dark transition-colors
                ${
                  day === today
                    ? "bg-blue-200 dark:bg-blue-900 text-black dark:text-text-secondary"
                    : doneCount === habits.length && habits.length > 0
                    ? "bg-green-300 dark:bg-green-800 text-black dark:text-text-secondary"
                    : doneCount > 0
                    ? "bg-green-100 dark:bg-green-900 text-black dark:text-text-secondary"
                    : "bg-white dark:bg-sidebar-dark text-black dark:text-text-secondary"
                }`}
              >
                <p>{day}</p>

                <p className="text-xs">
                  {doneCount}/{habits.length}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}