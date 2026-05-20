import { useHabit } from "../context/HabitContext";
import dayjs from "dayjs";


export function DayDetails() {
  const { selectedDate, habits, completedHabits, setCompletedHabits , setSelectedDate} = useHabit();
  if (!selectedDate) {
    return (
      <div>
      </div>
    );
  }

    const handleToggleHabit = (habitId) => {
    const dayHabits = completedHabits[selectedDate] || [];
    const isCompleted = dayHabits.includes(habitId);

    if (isCompleted) {
         setCompletedHabits((prev)=> ({
            ...prev,[selectedDate]: dayHabits.filter((id)=> id !== habitId)
         }))
    }else{
        setCompletedHabits((prev)=>({
            ...prev,[selectedDate]:[...dayHabits,habitId]
        }))
    }
}


  const formattedDate = dayjs(selectedDate).format('dddd, MMMM D, YYYY');
  const dayHabits = completedHabits[selectedDate] || [];

  return(
    <div className="mt-8 p-4 w-1/3  border border-gray-200 bg-[#f4f2ee]">
       <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[15px] ">
                {formattedDate}
            </h2>

            <button
                onClick={() => setSelectedDate(null)}
                className="text-gray-400 hover:text-black text-xl cursor-pointer"
            >
                ✕
            </button>
            </div>

     <div className="space-y-2">
        {habits.length === 0 ? (
            <p className="text-gray-400">No habits yet : add habits to continue</p>
        ):(
            habits.map((habit)=>{
                const isCompleted = dayHabits.includes(habit.id);
                return(
                   <label
                    key={habit.id}
                    className="flex items-center gap-3 p-3 border border-gray-100 
                    rounded-lg hover:bg-gray-50 transition cursor-pointer"
                        >
                     <input
                     type="checkbox"
                     checked={isCompleted}
                     onChange={()=>handleToggleHabit(habit.id)} 
                     className="w-5 h-5 cursor-pointer"/>
                      <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: habit.color }}
                />
                <span className="flex-1 text-[13px] font-medium">{habit.name}</span>
                 </label>
                )
            })
        )}
     </div>
    </div>
  )
}