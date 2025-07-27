import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi"; 
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaTimes } from "react-icons/fa"; 

const Header = ({ onToggleSidebar }) => {
  const [showChatDropdown, setShowChatDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false); 

  const chatDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const chatIconRef = useRef(null);
  const notificationIconRef = useRef(null);
  const searchInputRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (
        chatDropdownRef.current &&
        !chatDropdownRef.current.contains(event.target) &&
        chatIconRef.current &&
        !chatIconRef.current.contains(event.target)
      ) {
        setShowChatDropdown(false);
      }
 
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        notificationIconRef.current &&
        !notificationIconRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }

      if (
        showSearchInput &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        event.target.id !== "mobile-search-toggle" 
      ) {
        setShowSearchInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchInput]); 

  const chatMessages = [
    { id: 1, user: "John Doe", time: "10 mins ago" },
    { id: 2, user: "Jane Smith", time: "15 mins ago" },
    { id: 3, user: "Alice Brown", time: "30 mins ago" },
    { id: 4, user: "Bob White", time: "1 hour ago" },
  ];

  const notifications = [
    { id: 1, type: "Task completed", details: "Task comleted [task_name] marked as completed.", time: "10 mins ago" },
    { id: 2, type: "Meeting Created", details: "New meeting [meeting_title] is created for [date_time]", time: "5 mins ago" },
    { id: 3, type: "Action Item Added", details: "Action Item Added [action_item_name] is added in meeting [meeting_title]", time: "22 May 2025" },
    { id: 4, type: "Task assigned", details: "Task assigned [task_name] has been assigned to [user_name].", time: "2 hours ago" },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-4 bg-white border-b shadow-sm w-full">
 
      <div className="flex items-center gap-2"> 

        <FiMenu
          className="text-2xl cursor-pointer md:hidden" 
          onClick={onToggleSidebar}
        />

        <div className="relative hidden md:block w-64"> 
          <input
            type="text"
            placeholder="Search anything here..."
            className="w-full pl-10 pr-4 py-2 text-sm border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>


        <FiSearch
          id="mobile-search-toggle" 
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setShowSearchInput(!showSearchInput)}
        />
      </div>

    
      {showSearchInput && (
        <div ref={searchInputRef} className="fixed inset-x-0 top-16 z-40 bg-white p-3 border-b shadow-md md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search anything here..."
              className="w-full pl-10 pr-10 py-2 text-sm border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus // Automatically focus when it appears
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
            <FiX
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShowSearchInput(false)}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-4"> 
     
        <div className="relative">
          <IoChatbubbleEllipsesOutline
            ref={chatIconRef}
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={() => {
              setShowChatDropdown(!showChatDropdown);
              setShowNotificationDropdown(false);
              setShowSearchInput(false); // Close search input if open
            }}
          />
          <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-xs px-1.5 rounded-full">
            {chatMessages.length}
          </span>
          {showChatDropdown && (
            <div
              ref={chatDropdownRef}
              className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h4 className="font-semibold text-lg">Chat</h4>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{chatMessages.length} new</span>
              </div>
              <div className="max-h-64 overflow-y-auto hide-scrollbar">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center p-3 border-b last:border-b-0 hover:bg-gray-50">
                    <img
                      src="https://i.pravatar.cc/30"
                      alt="User"
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">New Message</div>
                      <div className="text-xs text-gray-500">You have a new message from <span className="font-semibold">{msg.user}</span></div>
                      <div className="text-xs text-gray-400">{msg.time}</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 ml-2">
                      <FaTimes className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t">
                <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
                  View All
                </button>
              </div>
            </div>
          )}
        </div>

     
        <div className="relative">
          <IoMdNotificationsOutline
            ref={notificationIconRef}
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setShowChatDropdown(false);
              setShowSearchInput(false); 
            }}
          />
          <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-xs px-1.5 rounded-full">
            {notifications.length}
          </span>
          {showNotificationDropdown && (
            <div
              ref={notificationDropdownRef}
              className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h4 className="font-semibold text-lg">Notifications</h4>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{notifications.length} new</span>
              </div>
              <div className="max-h-64 overflow-y-auto hide-scrollbar">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start p-3 border-b last:border-b-0 hover:bg-gray-50">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mr-3">
                      {notif.type.includes("Task") ? <FiSearch /> : <IoMdNotificationsOutline />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{notif.type}</div>
                      <div className="text-xs text-gray-500">{notif.details}</div>
                      <div className="text-xs text-gray-400">{notif.time}</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 ml-2">
                      <FaTimes className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t">
                <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
                  View All
                </button>
              </div>
            </div>
          )}
        </div>

     
        <div className="flex items-center gap-2 md:mr-8">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-9 h-9 rounded-full"
          />
        
          <div className="text-sm leading-tight hidden xs:hidden sm:block"> {/* Hidden on extra small, but block on sm */}
            <div className="font-medium text-gray-900">Mohd Saleem</div>
            <div className="text-gray-500 text-xs">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


