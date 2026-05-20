import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import dayjs from "dayjs";
import { useHabit } from "../context/HabitContext";

export function MonthlyChart() {
  const { completedHabits } = useHabit();

  const daysInMonth = dayjs().daysInMonth();

  const monthDays = Array.from({ length: daysInMonth }, (_, i) =>
    dayjs().date(i + 1)
  );

  const data = monthDays.map((day) => {
    const dateKey = day.format("YYYY-MM-DD");

    return {
      day: day.format("DD"),
      completed: completedHabits[dateKey]?.length || 0,
    };
  });

  return (
   <div className="w-full h-[350px]">
    <ResponsiveContainer>
      <LineChart data={data}>

        <CartesianGrid />
        <XAxis dataKey="day"/>

        <YAxis allowDecimals={false} />

        <Tooltip />

        <Line
        dataKey="completed"
        stroke="#22c55e"
        darkModeStroke="#deebe2"
        strokeWidth={2} />


      </LineChart>
    </ResponsiveContainer>
   </div>
  );
}