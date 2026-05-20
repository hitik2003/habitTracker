import { Routes, Route, Link } from "react-router-dom";
import { DashBoard } from "./components/Dashboard";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Calendar } from "./components/Calender";
import { Heatmap } from "./components/Heatmap";
import { DayDetails } from "./components/DayDetails";
import { Charts } from "./components/Charts";
import { DarkModeToggle } from "./DarkModeToggle";
import { CurrentStreak } from "./components/CurrentStreak";
import{BestStreak} from "./components/BestStreak";
import{MonthStats} from "./components/MonthStat"
import { TotalCheckins } from "./components/TotalCheckIns";


function AppContent() {
  
  return (
       
          <div className={`min-h-screen flex flex-col  bg-primary dark:bg-primary-dark text-gray-900`}>
           <div className="h-[52px] px-4 flex items-center justify-between border-b border-gray-200 dark:border-lines-dark">
  
              <div className="flex items-center gap-4">
                <Navbar />
              </div>

              <DarkModeToggle />

            </div>

            <div className="flex flex-1">
              <div className="w-[260px] border-r border-gray-200 bg-[#f4f2ee] dark:bg-sidebar-dark">
                <Sidebar />
              </div>

              <div className="flex-1 min-w-0 px-6 pt-6 pb-4">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-4 gap-4">
                  
                      <CurrentStreak />
                      

                     <BestStreak />

                     <MonthStats />

                      <TotalCheckins />
                    </div>

                      <div className=" mt-1 mt-[3px] border-b border-gray-200 pb-1">
                    <div className="flex gap-2 text-[13px] text-gray-500 dark:text-white-500 leading-none font-medium">
                      <Link to="/" className="hover:text-gray-800">
                        Dashboard
                      </Link>

                      <Link to="/calender" className="hover:text-gray-800">
                        Calendar
                      </Link>
                      <Link to="/heatmap" className="hover:text-gray-800">
                        Heatmap
                      </Link>
                      <Link to="/charts" className="hover:text-gray-800">
                        Charts
                      </Link>
                    </div>
                  </div>

                  <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/calender" element={<Calendar />} />
                    <Route
                      path="/heatmap"
                      element={
                        <div>
                          <Heatmap />
                          <DayDetails />
                        </div>
                      }
                    />
                    <Route path="/charts" element={<Charts />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
  );
}

export default AppContent;
