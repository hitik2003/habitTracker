import React, { } from "react";
import dayjs from "dayjs";
import { useHabit } from "../context/HabitContext";
import { MonthButtons } from "./MonthButtons";

export function DashBoard() {
 
  const { habits,currentMonth,setCompletedHabits,completedHabits} = useHabit();

 const daysInMonth = currentMonth.daysInMonth();
 const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
   days.push(currentMonth.date(i));
 }


   const toggleCheckbox = (date, habitId) => {
    setCompletedHabits((prev) => {
      const dayHabits = prev[date] || [];
      const updatedDayHabits = dayHabits.includes(habitId)
        ? dayHabits.filter((id) => id !== habitId)
        : [...dayHabits, habitId];

      return {
        ...prev,
        [date]: updatedDayHabits,
      };
    });
  };

 
  return (
    <div className="bg-[#f4f2ee] p-6 pt-[10px] w-full max-w-full dark:bg-primary-dark dark:text-dark dark:border-button-dark">
        <MonthButtons />

      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden  dark:bg-sidebar-dark dark:text-dark">
        <div
         className="grid gap-0 items-center min-w-max border border-black/10 rounded-[12px]"
          style={{
            gridTemplateColumns: `160px repeat(${days.length}, 32px)`,
          }}
        >
          <div className=" border border-black/10 px-3 py-2 bg-white h-10  dark:bg-sidebar-dark dark:text-dark">
            Habit
          </div>

          {days.map((day) => (
            <div
              key={day.format("YYYY-MM-DD")}
             className="flex items-center justify-center text-sm font-semibold border border-black/10 bg-white h-10  dark:bg-sidebar-dark dark:text-dark"
            >
             {day.format("D")}
            </div>
          ))}

          {habits.map((habit) => (
            <React.Fragment key={habit.id}>
              <div className="flex items-center px-3 bg-white border border-black/10 h-10 dark:bg-sidebar-dark dark:text-dark">
                {habit.name}
              </div>

              {days.map((day) => {
               const dateKey = day.format("YYYY-MM-DD");
                const isChecked = (completedHabits[dateKey] || []).includes(habit.id);

                const isFutureDate = day.isAfter(dayjs(), "day");

                return (
                  <label
                    key={dateKey}
                    className={`flex items-center justify-center w-full h-10 border border-black/10 
                         bg-white cursor-pointer ${isFutureDate ? "cursor-not-allowed opacity-30" : ""}  dark:bg-primary-dark dark:text-dark dark:border-lines-dark`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isFutureDate}
                          onChange={() =>
                            toggleCheckbox(
                             dateKey,
                              habit.id
                            )
                          }
                     className="h-5 w-5 appearance-none rounded-full cursor-pointer
                        border border-black/20 dark:border-lines-dark
                        bg-white dark:bg-black
                        transition-colors"
                    style={{
                       backgroundColor: isChecked
                       ? habit.color
                       : undefined,
                            }}
                    />
                  </label>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}