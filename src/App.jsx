import { Outlet } from "react-router-dom";
import "./App.css";
import { SidebarProvider } from "./components/Context/SidebarContext";

function App() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

export default App;
