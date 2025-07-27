import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaTasks, FaBox, FaUser, FaTimes } from "react-icons/fa"; 
import { MdMeetingRoom } from "react-icons/md";
import logo from "../assets/adamexports.png";


const Sidebar = ({ onClose }) => {
  const fullMenu = [
    { label: "Dashboard", path: "/", icon: <FaTachometerAlt />, route: false },
    { label: "Buyer Meeting", path: "/buyer-meeting", icon: <MdMeetingRoom />, route: true },
    { label: "Tasks",  icon: <FaTasks />, route: false },
    { label: "Quick Costing", route: false },
    { label: "Pre-costing", route: false },
    { label: "Style Library", route: false },
    { label: "Requirements", route: false },
    { label: "Buyer Purchase", route: false },
    { label: "Inventory", path: "/inventory", icon: <FaBox />, route: false },
    { label: "Production", route: false },
    { label: "Sample Development", route: false },
    { label: "HR/Admin", route: false },
    { label: "Master Admin", route: false },
    { label: "Reports", route: false },
    { label: "Accounts", route: false },
    { label: "Shipment", route: false },
    { label: "KnowHub / KnowSkill", route: false },
    { label: "Buyer Details", route: false },
    { label: "Settings", icon: <FaUser />, route: false },
  ];

  return (
    <aside className="w-64 h-full hide-scrollbar overflow-y-auto bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0">
      <div className="p-4 text-xl font-bold border-b flex justify-between items-center">
        <img src={logo} className="h-8 w-auto" alt="" />

        <button onClick={onClose} className="md:hidden text-gray-600 hover:text-gray-900">
          <FaTimes className="text-2xl" />
        </button>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {fullMenu.map((item, idx) =>
          item.route ? (
            <NavLink
              to={item.path}
              key={idx}

              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition ${
                  isActive ? "bg-purple-100 text-purple-800 font-semibold" : ""
                }`
              }
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </NavLink>
          ) : (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-2 text-gray-500 cursor-not-allowed"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </div>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;