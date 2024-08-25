import React, { useState } from "react";
import "./FillReport.css"; // Import the CSS file

function FillReport() {
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState("");

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

  return (
    <div className="container">
      <div className="header-container">
        <h1>Enter Analysis Report</h1>
        <p>
          Press "Start Dictation" to begin recording. Speak into your
          microphone, and the text will appear below.
        </p>
      </div>
      <div className="button-container">
        <button onClick={startDictation}>Start Dictation</button>
        <button onClick={stopDictation}>Stop Dictation</button>
      </div>
      <textarea
        id="inputField"
        placeholder="Your speech will appear here..."
        value={transcript}
        readOnly
      ></textarea>
    </div>
  );
}

export default FillReport;
