import dayjs from "dayjs";
import { useHabit } from "../context/HabitContext";
import { StatsCard } from "./StatCard";

export function CurrentStreak() {
  const { completedHabits, habits } = useHabit();

  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const date = dayjs().subtract(i, "day");
    const dateKey = date.format("YYYY-MM-DD");

    const doneHabits = completedHabits[dateKey] || [];

    const allHabitsDone =
      habits.length > 0 &&
      doneHabits.length === habits.length;

    if (allHabitsDone) {
      streak++;
    } else {
      break;
    }
  }

  return (
    <StatsCard
      title="Current Streak"
      value={streak}
      subtitle="perfect days"
    />
  );
}