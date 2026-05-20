import dayjs from "dayjs";
import { useHabit } from "../context/HabitContext";
import { StatsCard } from "./StatCard";

export function BestStreak() {
  const { completedHabits, habits } = useHabit();

  let currentStreak = 0;
  let bestStreak = 0;

  for (let i = 0; i < 365; i++) {
    const date = dayjs().subtract(i, "day");
    const dateKey = date.format("YYYY-MM-DD");

    const doneHabits = completedHabits[dateKey] || [];

    const allHabitsDone =
      habits.length > 0 &&
      doneHabits.length === habits.length;

    if (allHabitsDone) {
      currentStreak++;

      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  return (
    <StatsCard
      title="Best Streak"
      value={bestStreak}
      subtitle="personal best"
    />
  );
}