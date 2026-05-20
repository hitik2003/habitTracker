
import { useHabit } from "../context/HabitContext";
import { StatsCard } from "./StatCard";

export function MonthStats() {
  const { completedHabits, habits , currentMonth} = useHabit();

  const daysInMonth = currentMonth.daysInMonth();

  let completedCount = 0

  for(let i = 0; i<daysInMonth;i++){
    const dateKey = currentMonth
      .date(i)
      .format("YYYY-MM-DD");

    completedCount +=
      completedHabits[dateKey]?.length || 0;
  }

  const totalPossible = habits.length * daysInMonth;

  const percentage = totalPossible>0 ? Math.round((completedCount/totalPossible) * 100):0;
  
  return (
    <StatsCard
    title="This Month"
    value={`${percentage}%`}
    subtitle="completion rate" />
  )

}