import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManagerSchedule.css"; 

const ManagerSchedule = () => {
  const [employees, setEmployees] = useState([]);

  const [editingSchedule, setEditingSchedule] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleScheduleChange = (id, value) => {
    setEditingSchedule((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const updateSchedule = async (id) => {
    const newSchedule = editingSchedule[id];
    if (newSchedule === undefined) return;
    try {
      const employee = employees.find((emp) => emp.id === id);
      const response = await axios.put(`http://localhost:8080/api/employees/${id}`, {
        fullName: employee.fullName,
        schedule: newSchedule,
      });
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? response.data : emp))
      );
      alert("Schedule updated.");
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Failed to update schedule.");
    }
  };

  return (
    <div className="manager-schedule-container">
      <h1>Employee Schedule</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Schedule</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.fullName}</td>
              <td>
                <input
                  type="text"
                  placeholder={emp.schedule || "Enter schedule"}
                  value={editingSchedule[emp.id] || emp.schedule || ""}
                  onChange={(e) =>
                    handleScheduleChange(emp.id, e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => updateSchedule(emp.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/employee-management")}>
        Manage Employees
      </button>
    </div>
  );
};

export default ManagerSchedule;
