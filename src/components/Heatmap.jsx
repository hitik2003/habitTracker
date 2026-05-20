import { useHabit } from "../context/HabitContext";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useState } from "react";

dayjs.extend(isoWeek);

export function Heatmap() {
  const { completedHabits, habits, setSelectedDate } = useHabit();
  const [selectedHabitId, setSelectedHabitId] = useState("all");

  const selectedHabit =
    selectedHabitId === "all"
      ? null
      : habits.find((h) => Number(h.id) === Number(selectedHabitId));

  const totalHabits = habits.length;

  const cellSize = 16;
  const gap = 4;

  const startDate = dayjs().subtract(364, "day");
  const startOffset = startDate.isoWeekday() - 1;
  const totalCells = startOffset + 365;
  const totalWeeks = Math.ceil(totalCells / 7);

  const days = [];
  const months = [];
  for (let i = 0; i < 365; i++) {
    const date = startDate.add(i, "day");
    const dateKey = date.format("YYYY-MM-DD");
    const completedForDay = completedHabits[dateKey] || [];

    const gridIndex = startOffset + i;
    const weekIndex = Math.floor(gridIndex / 7);

    let doneCount = 0;
    let isSelectedHabitDone = false;
    let level = 0;

    if (selectedHabitId === "all") {
      doneCount = completedForDay.length;

      if (totalHabits > 0) {
        const ratio = doneCount / totalHabits;

        if (ratio === 0) level = 0;
        else if (ratio < 0.34) level = 1;
        else if (ratio < 0.67) level = 2;
        else level = 3;
      }
    } else {
      isSelectedHabitDone = completedForDay.includes(Number(selectedHabitId));
    }

    if (date.date() === 1) {
      const alreadyExists = months.some((m) => m.weekIndex === weekIndex);
      if (!alreadyExists) {
        months.push({
          label: date.format("MMM"),
          weekIndex,
        });
      }
    }

    days.push({
      level,
      dateKey,
      doneCount,
      isSelectedHabitDone,
    });
  }
  const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-text-secondary">
          Filter by habit:
        </label>
        <select
          value={selectedHabitId}
          onChange={(e) =>
            setSelectedHabitId(
              e.target.value === "all" ? "all" : Number(e.target.value),
            )
          }
          className="rounded border border-gray-300 bg-white px-2 py-1 text-sm 
                     dark:bg-sidebar-dark dark:border-lines-dark dark:text-text-secondary"
        >
          <option value="all">All habits</option>
          {habits.map((habit) => (
            <option key={habit.id} value={habit.id}>
              {habit.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block ">
          <div className="flex gap-2">
            <div style={{ width: 28 }} />
            <div
              className="grid mb-2 text-xs text-gray-500"
              style={{
                gridTemplateColumns: `repeat(${totalWeeks},${cellSize}px)`,
                gap: `${gap}px`,
              }}
            >
              {Array.from({ length: totalWeeks }).map((_, colIndex) => {
                const month = months.find((m) => m.weekIndex === colIndex);

                return (
                  <div
                    key={colIndex}
                    style={{ width: cellSize, height: cellSize }}
                    className="text-[10px] text-gray-500 dark:text-text-secondary"
                  >
                    {month ? month.label : ""}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2">
            <div
              className="grid text-[10px] text-gray-500"
              style={{
                gridTemplateRows: `repeat(7 , ${cellSize}px)`,
                width: 28,
                gap: `${gap}px`,
              }}
            >
              {weekdayLabels.map((label, index) => (
                <div
                  key={index}
                  style={{ height: cellSize }}
                  className="flex items-center justify-end text-gray-500 dark:text-text-secondary"
                >
                  {label}
                </div>
              ))}
            </div>

            <div
              className="grid grid-rows-7  grid-flow-col"
              style={{
                gridAutoColumns: `${cellSize}px`,
                gap: `${gap}px`,
              }}
            >
              {Array.from({ length: startOffset }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  style={{ width: cellSize, height: cellSize }}
                  className="rounded-sm dark:bg-primary-dark"
                />
              ))}
              {days.map((day) => (
                <div key={day.dateKey} className="relative group">
                  <div
                    style={{
                      width: cellSize,
                      height: cellSize,
                      ...(selectedHabitId !== "all" &&
                      day.isSelectedHabitDone &&
                      selectedHabit
                        ? { backgroundColor: selectedHabit.color }
                        : {}),
                    }}
                    className={`rounded-sm shrink-0 cursor-pointer transition-all hover:scale-110 
                      dark:border-lines-dark ${
                        selectedHabitId === "all"
                          ? day.level === 0
                            ? "bg-gray-200 dark:bg-sidebar-dark"
                            : day.level === 1
                              ? "bg-green-100 dark:bg-green-900"
                              : day.level === 2
                                ? "bg-green-300 dark:bg-green-700"
                                : "bg-green-500 dark:bg-green-500"
                          : day.isSelectedHabitDone
                            ? ""
                            : "bg-gray-200 dark:bg-sidebar-dark"
                      }`}
                    onClick={() => setSelectedDate(day.dateKey)}
                  />
                  <div
                    className="
                      absolute
                      hidden
                      group-hover:block
                      bottom-full
                      left-1/2
                      -translate-x-1/2
                      mb-2
                      whitespace-nowrap
                      rounded
                      bg-black
                      px-2
                      py-1
                      text-xs
                      text-white
                      z-50
                    "
                  >
                    {day.dateKey}
                    <br />
                    {selectedHabitId === "all"
                      ? `${day.doneCount}/${totalHabits} habits`
                      : day.isSelectedHabitDone
                        ? `${selectedHabit?.name} done`
                        : `${selectedHabit?.name} not done`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
