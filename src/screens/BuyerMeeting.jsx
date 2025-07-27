

import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV, FaEye, FaEdit, FaHistory, FaTrash } from "react-icons/fa";

const meetings = [
  {
    date: "01 May, 2025",
    time: "2pm",
    status: "Completed",
    type: "Online",
    buyerName: "Mango Private Limited",
    brand: "Mango",
    dept: "Design",
    title: "Costing Discussion with Zara",
    participants: ["Mohd Saleem", "John Doe", "Jane Smith"],
    roles: ["Buyer", "Sales", "Designer"]
  },
  {
    date: "02 May, 2025",
    time: "3pm",
    status: "Upcoming",
    type: "Offline",
    buyerName: "Cherry Innovations",
    brand: "Cherry",
    dept: "Development",
    title: "UI/UX Review",
    participants: ["Alice Johnson", "Bob Williams"],
    roles: ["Developer", "Designer"]
  },
  {
    date: "03 May, 2025",
    time: "10am",
    status: "Follow-up (3)",
    type: "Offline",
    buyerName: "Pineapple Inc.",
    brand: "Pineapple",
    dept: "Marketing",
    title: "Campaign Strategy",
    participants: ["Charlie Brown", "Lucy Van Pelt", "Linus Van Pelt"],
    roles: ["Marketing", "Design", "Strategy"]
  },
  {
    date: "04 May, 2025",
    time: "1pm",
    status: "Re-scheduled",
    type: "Offline",
    buyerName: "Peach Corp.",
    brand: "Peach",
    dept: "Finance",
    title: "Budget Review",
    participants: ["David Wilson", "Emma Davis"],
    roles: ["Finance", "Accounting"]
  },
  {
    date: "05 May, 2025",
    time: "11am",
    status: "Upcoming",
    type: "Online",
    buyerName: "Grapefruit LLC",
    brand: "Grapefruit",
    dept: "Sales",
    title: "New Client Onboarding",
    participants: ["Frank White", "Grace Black"],
    roles: ["Sales Manager", "Accountant"]
  },
  {
    date: "06 May, 2025",
    time: "9am",
    status: "Completed",
    type: "Offline",
    buyerName: "Lemon Holdings",
    brand: "Lemon",
    dept: "Operations",
    title: "Supply Chain Review",
    participants: ["Henry Green", "Ivy Blue"],
    roles: ["Operations Lead", "Logistics"]
  },
  {
    date: "07 May, 2025",
    time: "4pm",
    status: "Follow-up (3)",
    type: "Online",
    buyerName: "Lime Enterprises",
    brand: "Lime",
    dept: "HR",
    title: "Recruitment Strategy",
    participants: ["Jack Yellow", "Karen Red"],
    roles: ["HR Manager", "Recruiter"]
  },
  {
    date: "08 May, 2025",
    time: "2pm",
    status: "Re-scheduled",
    type: "Offline",
    buyerName: "Kiwi Solutions",
    brand: "Kiwi",
    dept: "IT",
    title: "System Upgrade Planning",
    participants: ["Liam Brown", "Mia Grey"],
    roles: ["IT Manager", "Developer"]
  },
  {
    date: "09 May, 2025",
    time: "10am",
    status: "Upcoming",
    type: "Online",
    buyerName: "Berry Group",
    brand: "Berry",
    dept: "Product",
    title: "Product Feature Brainstorm",
    participants: ["Noah Purple", "Olivia Cyan"],
    roles: ["Product Manager", "UX Designer"]
  },
  {
    date: "10 May, 2025",
    time: "11am",
    status: "Completed",
    type: "Offline",
    buyerName: "Plum Ventures",
    brand: "Plum",
    dept: "Legal",
    title: "Contract Review",
    participants: ["Peter Olive", "Quinn Magenta"],
    roles: ["Legal Counsel", "Compliance"]
  }
];

const statusOptions = [
  "Completed",
  "Upcoming",
  "Follow-up (3)",
  "Re-scheduled",
  "Overdue",
  "In Progress (1/3)",
  "Ongoing",
  "Draft",
  "Archived"
];

const statusColor = {
  Completed: "bg-green-100 text-green-800",
  Upcoming: "bg-orange-100 text-orange-800",
  "Follow-up (3)": "bg-blue-100 text-blue-800",
  "Re-scheduled": "bg-purple-500 text-white",
  Overdue: "bg-red-100 text-red-800",
  "In Progress (1/3)": "bg-orange-200 text-orange-900",
  Ongoing: "bg-black text-white",
  Draft: "bg-gray-200 text-gray-800",
  Archived: "bg-red-200 text-red-900"
};

const BuyerMeeting = () => {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [showDropdownIndex, setShowDropdownIndex] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const scrollContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleStatusChange = (index, status) => {
    setSelectedStatus(prev => ({ ...prev, [index]: status }));
  };

  const toggleDropdown = (index) => {
    setShowDropdownIndex(showDropdownIndex === index ? null : index);
  };

  const handleRowSelect = (index) => {
    setSelectedRows(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      const allRowIndexes = meetings.map((_, index) => index);
      setSelectedRows(allRowIndexes);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-semibold">Buyer Meeting List View</h2>
        <div className="space-x-2">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md">Export</button>
          <button className="bg-black text-white px-4 py-2 rounded-md">+ Create New Meeting</button>
        </div>
      </div>

      <div className="hidden sm:block border rounded-lg overflow-x-auto md:max-h-[500px]" ref={scrollContainerRef}>
        <div className="min-w-[1200px]">
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded checked:bg-purple-600 checked:border-transparent focus:ring-purple-500"
                    onChange={handleSelectAllRows}
                    checked={selectedRows.length === meetings.length && meetings.length > 0}
                  />
                </th>
                <th className="p-3 whitespace-nowrap">Date & Time</th>
                <th className="p-3 whitespace-nowrap">Status</th>
                <th className="p-3 whitespace-nowrap">Type</th>
                <th className="p-3 whitespace-nowrap">Buyer Name</th>
                <th className="p-3 whitespace-nowrap">Brand</th>
                <th className="p-3 whitespace-nowrap">Dept.</th>
                <th className="p-3 whitespace-nowrap">Title</th>
                <th className="p-3 whitespace-nowrap">Participants</th>
                <th className="p-3 sticky right-0 bg-white border-l z-20">Action</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting, idx) => (
                <tr key={idx} className={`border-b hover:bg-gray-50 ${selectedRows.includes(idx) ? 'bg-purple-100' : ''}`}>
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 rounded checked:bg-purple-600 checked:border-transparent focus:ring-purple-500"
                      checked={selectedRows.includes(idx)}
                      onChange={() => handleRowSelect(idx)}
                    />
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">{meeting.date} - {meeting.time}</td>
                  <td className="p-3 whitespace-nowrap">
                    <select
                      value={selectedStatus[idx] || meeting.status}
                      onChange={(e) => handleStatusChange(idx, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[selectedStatus[idx] || meeting.status]}`}
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${meeting.type === "Online" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                      {meeting.type}
                    </span>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">{meeting.buyerName}</td>
                  <td className="p-3 text-xs whitespace-nowrap">{meeting.brand}</td>
                  <td className="p-3 text-xs whitespace-nowrap">{meeting.dept}</td>
                  <td className="p-3 text-xs whitespace-nowrap">{meeting.title}</td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <div className="flex items-start gap-2">
                      <input type="checkbox" className="form-checkbox h-4 w-4 rounded checked:bg-purple-600 checked:border-transparent focus:ring-purple-500" checked readOnly />
                      <div>
                        <div className="text-xs font-semibold">
                          {meeting.participants[0]} +{meeting.participants.length - 1}
                        </div>
                        <div className="text-[10px] text-gray-500">{meeting.roles.join(", ")}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 sticky right-0 bg-white border-l z-10">
                    <div className="relative" ref={showDropdownIndex === idx ? dropdownRef : null}>
                      <button
                        onClick={() => toggleDropdown(idx)}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                      >
                        <FaEllipsisV />
                      </button>
                      {showDropdownIndex === idx && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                          <button onClick={() => console.log("View", meeting)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                            <FaEye className="mr-2" /> View
                          </button>
                          <button onClick={() => console.log("Edit", meeting)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button onClick={() => console.log("Activity Log", meeting)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                            <FaHistory className="mr-2" /> Activity Log
                          </button>
                          <button onClick={() => console.log("Delete", meeting)} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                            <FaTrash className="mr-2" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sm:hidden space-y-4">
        {meetings.map((meeting, idx) => (
          <div key={idx} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">{meeting.title}</h3>
               <div className="relative" ref={showDropdownIndex === idx ? dropdownRef : null}>
                      <button
                        onClick={() => toggleDropdown(idx)}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                      >
                        <FaEllipsisV />
                      </button>
                      {showDropdownIndex === idx && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                          <button onClick={() => console.log("View", meeting)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                            <FaEye className="mr-2" /> View
                          </button>
                          <button onClick={() => console.log("Edit", meeting)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button onClick={() => console.log("Activity Log", meeting)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                            <FaHistory className="mr-2" /> Activity Log
                          </button>
                          <button onClick={() => console.log("Delete", meeting)} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                            <FaTrash className="mr-2" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">{meeting.date} at {meeting.time}</div>
            <div className="mt-2">
              <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColor[selectedStatus[idx] || meeting.status]}`}>
                {selectedStatus[idx] || meeting.status}
              </span>
              <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded ${meeting.type === "Online" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                {meeting.type}
              </span>
            </div>
            <div className="mt-2 text-sm">
              <strong>Buyer:</strong> {meeting.buyerName} <br />
              <strong>Brand:</strong> {meeting.brand} | <strong>Dept:</strong> {meeting.dept}
            </div>
            <div className="mt-1 text-xs text-gray-600">
              <strong>Participants:</strong> {meeting.participants.join(", ")}<br />
              <strong>Roles:</strong> {meeting.roles.join(", ")}
            </div>
          </div>
        ))}
      </div>
      <div className="md:flex hidden justify-between items-center px-4 py-2 border-t bg-white ">
        <div className="text-sm text-gray-600">Showing 1 to {meetings.length} of {meetings.length} entries</div>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 border rounded">Prev</button>
          <button className="px-3 py-1 border rounded bg-purple-500 text-white">1</button>
          <button className="px-2 py-1 border rounded">2</button>
          <button className="px-2 py-1 border rounded">3</button>
          <button className="px-2 py-1 border rounded">Next</button>
        </div>
      </div>

    </div>
  );
};

export default BuyerMeeting;
