import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createTireInspectionModal.css";

function CreateTireInspectionModal({ isOpen, onClose, onCreate }) {
  const [inspectionName, setInspectionName] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Create New Tire Inspection</h2>
        <input
          type="text"
          placeholder="Enter inspection name"
          value={inspectionName}
          onChange={(e) => setInspectionName(e.target.value)}
          className="modal-input"
        />
        <button
          onClick={() => {
            onCreate(inspectionName);
            onClose();
            navigate("/fillTireInspection");
          }}
        >
          Create Inspection
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default CreateTireInspectionModal;
