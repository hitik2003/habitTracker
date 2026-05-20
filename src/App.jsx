import { HabitProvider } from "./context/HabitContext";
import AppContent from "./AppContent";
function App() {
 
  return (
        <HabitProvider>
         <AppContent />
        </HabitProvider>
  );
}

export default App;
