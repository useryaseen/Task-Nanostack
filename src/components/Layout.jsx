

import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Header from "./Header";
import { useState } from "react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 md:block`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

    
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

   
      <div className="flex-1 flex flex-col overflow-hidden ml-0 ">
    
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

    
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
