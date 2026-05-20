import { useState,useRef,useEffect } from "react";
import { useHabit } from "../context/HabitContext";

export function Sidebar() {
  const {habits,addHabit,deleteHabit,updateHabit,colors,selectedColor,setSelectedColor} = useHabit();
  const [newHabit, setNewHabit] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showOptions,setShowOptions] = useState(null)
  const [editHabit, setEditHabit] = useState(null)
  const [editedName,setEditedName] = useState("")

  const optionsRef = useRef()

  useEffect(() => {
       const handleClickOutside = (e)=>{
        if(optionsRef.current && !optionsRef.current.contains(e.target)){
          setShowOptions(null)
        }
       }

       document.addEventListener("mousedown",handleClickOutside)

       return ()=>{
        document.removeEventListener("mousedown",handleClickOutside)
       }
  },[])

  const handleAddNewHabit=() => {
    if(!newHabit.trim())return;
     addHabit(newHabit)
     setNewHabit("");
     setIsFormOpen(false);
  }

  const handleDeleteHabit = (id) => {
    window.confirm("Are you sure you want to delete this habit?") &&
       deleteHabit(id)
  }

  const handleEditState = (habit) => {
          setEditHabit(habit.id);
        setEditedName(habit.name);
        setShowOptions(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNewHabit();
  };


  const handleSave = ()=> {
    updateHabit(editHabit,editedName);
    setEditHabit(null);
    setEditedName("");  
  }

  return (
    <div className=" bg-[#f4f2ee] dark:bg-sidebar-dark dark:text-dark p-1">
      <div className="flex-1 bg-[#f4f2ee] h-[52px] flex items-center px-4  dark:bg-sidebar-dark">
        <div className="font-[14px] font-semibold ">My Habits</div>
      </div>

      {habits.map((habit) => (
       
        editHabit === habit.id ? 
          <div key={habit.id} className="flex justify-between items-center gap-2.5 px-2.5 py-1 rounded-[6px] 
        cursor-pointer border-2 border-transparent transition relative hover:bg-[#f0fdf4] ">
                <input
                className="w-full px-[10px] py-[8px] border border-[#e8e4dd] rounded-[6px] bg-[#f4f2ee)] 
                font-['DM_Sans'] text-[13px] outline-none transition-colors duration-100"
                placeholder='enter habit'
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <button onClick={handleSave}>save</button>
              </div>
              :
        <div key={habit.id} className="flex  items-center gap-2.5 px-2.5 py-1 rounded-[6px] 
        cursor-pointer border-2 border-transparent transition relative hover:bg-primary dark:hover:bg-primary-dark"
        ref={showOptions === habit.id ? optionsRef : null}>

           

         <span className="inline-block h-3 w-3 rounded-full border border-gray-300 "
          style={{ backgroundColor: habit.color }} />

          <span className="">{habit.name}</span>

          <button type="button" className="bg-transparent border-0
           cursor-pointer text-[16px] px-1 leading-none opacity-0 transition-opacity 
           duration-150 hover:opacity-100 hover:bg-[#f0fdf4] ml-auto" 
            onClick={() => setShowOptions((prev)=>(prev === habit.id?null:habit.id))}>
            ...
            </button>
             
            {showOptions === habit.id && (
               <div className="absolute right-2 top-full mt-1 z-20 flex flex-col gap-1 
               rounded-lg bg-white shadow-md border border-slate-200 px-2 py-1 text-[13px]"  >

              <button className="px-3 py-1 text-left text-slate-700 hover:bg-slate-100 rounded transition"
                onClick={() => handleEditState(habit)}>Edit</button>

              <button  className="px-3 py-1 text-left text-red-600 hover:bg-red-50 hover:text-red-700 rounded transition"
               onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
            </div>
           )}
        </div>
      ))}

      <div>
        <button
          className="w-full rounded-[8px] bg-[#c49a2a] px-[12px] py-[9px] 
                text-[13px] font-semibold text-white cursor-pointer border-none transition-opacity
                 duration-150 hover:opacity-90 mb-[14px] mt-6"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
           New Habit
        </button>
      </div>


      <div>
        {isFormOpen && (
          <div className="bg-[#faf9f6]  border-[#e8e4dd] rounded-[8px] p-[14px] mb-[14px] dark:bg-primary-dark dark:border-lines-dark 
          dark:text-dark">
            <form onSubmit={handleSubmit}>
              <label className="block mb-[6px] font-['DM_Sans'] text-[13px] opacity-50">
                Habit Name
              </label>
              <input
                className="w-full px-[10px] py-[8px] border border-[#e8e4dd] rounded-[6px] bg-[#f4f2ee] font-['DM_Sans'] text-[13px]
                 outline-none transition-colors duration-100 dark:bg-primary-dark dark:border-lines-dark dark:text-dark"
                placeholder="enter new habit"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
              />
            </form>

             <label className="block mb-[6px] font-['DM_Sans'] text-[13px] opacity-50 mt-4">
                color
              </label>

            <div className="mt-4 flex flex-wrap gap-3">
          {colors.map((color)=>(
            <button type="button"
            key={color}
            onClick={()=>setSelectedColor(color)}
             className={`h-6 w-6 rounded-full border border-gray-300 ${
             selectedColor === color ? "ring-2 ring-black ring-offset-2" : ""}`}
             style={{ backgroundColor: color }}
             aria-label={`Select ${color}`} 
             />

              ))}
          </div>

             <button type='submit' className="px-4 py-[7px] bg-[#c49a2a] text-white border-0 
            rounded-md font-['DM_Sans',sans-serif] text-[13px] font-semibold cursor-pointer my-2" onClick={handleSubmit}>
              Add new Habit
              </button>

          </div>
        )}

       
      </div>

  
    </div>
  );
}
