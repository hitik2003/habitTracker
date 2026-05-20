import { useHabit } from "../context/HabitContext";
import { StatsCard } from "./StatCard";

export function TotalCheckins() {
  const { completedHabits } = useHabit();

  let total = 0;

  Object.values(completedHabits).forEach((day) => {
    total += day.length;
  });

  return (
    <StatsCard
      title="Total Check-ins"
      value={total}
      subtitle="all time"
    />
  );
}