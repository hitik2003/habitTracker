import { useContext,createContext,useState, useEffect } from "react";
import dayjs from "dayjs";
const HabitContext = createContext();

const colors = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#22c55e",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export const HabitProvider = ({children}) => {
     const [currentMonth, setCurrentMonth] = useState(dayjs());
     const [selectedColor, setSelectedColor] = useState(colors[0]);
     const [selectedDate,setSelectedDate] = useState(null)
    const [habits, setHabits] = useState(() => {
         try{
            const savedHabits = localStorage.getItem("habitlist");
            if (!savedHabits) return [];
            
            const parsedHabits = JSON.parse(savedHabits);
            
            if (!Array.isArray(parsedHabits)) {
                console.error("habitlist is not an array, resetting");
                localStorage.removeItem("habitlist");
                return [];
            }
            return parsedHabits;
        }catch (error){
            console.error("error parsing habits from localStorage",error);
            localStorage.removeItem("habitlist");   
            return [];
        }
    })

    
   useEffect(() => {
    localStorage.setItem("habitlist", JSON.stringify(habits));
  }, [habits]);

    

    const [completedHabits, setCompletedHabits] = useState(()=>{
        try{
            const savedHabits = localStorage.getItem("completedHabits");
            const parsedHabits = savedHabits?JSON.parse(savedHabits):{};
            return parsedHabits
        }catch (err){
               console.error("not founding done habits",err)
               localStorage.removeItem("completedHabits");
               return {};
        }
    });

     useEffect(() => {
        localStorage.setItem("completedHabits",JSON.stringify(completedHabits))
     },[completedHabits])

    const addHabit = (habit) => {
        const newHabit = {
            id:Date.now(),
            name:habit,
            color:selectedColor,
        }
        setHabits((prev) => [...prev,newHabit]);

       
    }

    const deleteHabit=(habitId)=>{
        setHabits((prev)=>prev.filter((habit)=> habit.id !== habitId))
        
        setCompletedHabits((prev) => {
            const updated = {...prev};
            Object.keys(updated).forEach((date) => {
                updated[date] = updated[date].filter(id => id !== habitId);
                if (updated[date].length === 0) {
                    delete updated[date];
                }
            });
            return updated;
        });
    }

    const updateHabit = (id,newName) => {
        setHabits((prev)=> 
        prev.map((habit)=>habit.id === id ? {...habit,name:newName}: habit))
    }

    const nextMonth = () => {
        setCurrentMonth((prev) => prev.add(1, "month"));
      }

    const previousMonth = () => {
        setCurrentMonth((prev)=>prev.subtract(1,"month"))
    }

    return(
        <HabitContext.Provider value={{
            habits,
            setHabits,
            addHabit,
            deleteHabit,
            updateHabit,
            colors,
            selectedColor,
            setSelectedColor,
            currentMonth,
            setCurrentMonth,
            nextMonth,
            previousMonth,
            completedHabits,
            setCompletedHabits,
            selectedDate,
            setSelectedDate
        }}>
            {children}
        </HabitContext.Provider>
    )
}

export const useHabit = () => {
    const context = useContext(HabitContext);
    if(context === undefined){
        throw new Error("useHabit must be used within a HabitProvider")
    }
    return context;
}