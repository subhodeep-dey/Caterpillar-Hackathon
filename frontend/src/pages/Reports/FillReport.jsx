import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FillReport.css";

function FillReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState("");
  const { reportName } = location.state || {};

  const startDictation = () => {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      const localRecognition = new window.webkitSpeechRecognition();
      localRecognition.continuous = true;
      localRecognition.interimResults = false;
      localRecognition.lang = "en-US";
      localRecognition.start();

      localRecognition.onresult = function (event) {
        setTranscript(
          (prevTranscript) =>
            prevTranscript +
            event.results[event.results.length - 1][0].transcript +
            " "
        );
      };

      localRecognition.onerror = function (event) {
        console.error("Speech Recognition Error: ", event.error);
        localRecognition.stop();
      };

      setRecognition(localRecognition);
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  const stopDictation = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const discardReport = () => {
    navigate("/reports");
  };

  const generateReport = () => {
    // Implement report generation logic here
    alert("Report generated!");
  };

  return (
    <div className="container">
      <h1>Enter Analysis Report for {reportName && <>{reportName}</>}</h1>
      <button onClick={discardReport} style={{ marginLeft: "auto" }}>
        Discard Report
      </button>
      <p>
        Press "Start Dictation" to begin recording. Speak into your microphone,
        and the text will appear below.
      </p>
      <div className="buttons-group">
        <button onClick={startDictation}>Start Dictation</button>
        <button onClick={stopDictation}>Stop Dictation</button>
      </div>
      <textarea
        id="inputField"
        placeholder="Your speech will appear here..."
        value={transcript}
        readOnly
      ></textarea>
      <h2>Manual Entry</h2>
      <div className="manual-entry">
        <label>
          <span>ASSET:</span>
          <input type="text" name="asset" />
        </label>
        <label>
          <span>REPORT NAME:</span>
          <input type="text" name="reportName" />
        </label>
        <label>
          <span>CONDITION:</span>
          <input type="text" name="condition" />
        </label>
        <label>
          <span>DATE:</span>
          <input type="date" name="date" />
        </label>
        <label>
          <span>ACTION:</span>
          <input type="text" name="action" />
        </label>
      </div>
      <button className="generate-report" onClick={generateReport}>
        Generate Report
      </button>
    </div>
  );
}

export default FillReport;
