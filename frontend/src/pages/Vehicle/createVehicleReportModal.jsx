import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createReportModal.css";

function CreateVehicleModal({ isOpen, onClose, onCreate }) {
  const [reportName, setReportName] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Create New Report</h2>
        <input
          type="text"
          placeholder="Enter report name"
          value={reportName}
          onChange={(e) => setReportName(e.target.value)}
          className="modal-input"
        />
        <button
          onClick={() => {
            onCreate(reportName);
            onClose();
            navigate("/fillVehicleInspection");
          }}
        >
          Create Report
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default CreateVehicleModal;
