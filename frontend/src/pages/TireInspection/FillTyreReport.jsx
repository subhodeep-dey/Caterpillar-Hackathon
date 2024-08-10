import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FillTyreReport() {
    const location = useLocation();
    const navigate = useNavigate();
    const [recognition, setRecognition] = useState(null);
    const [transcript, setTranscript] = useState('');
    const { reportName } = location.state || {};

    const startDictation = () => {
        if (window.hasOwnProperty('webkitSpeechRecognition')) {
            const localRecognition = new window.webkitSpeechRecognition();
            localRecognition.continuous = true;
            localRecognition.interimResults = false;
            localRecognition.lang = 'en-US';
            localRecognition.start();

            localRecognition.onresult = function (event) {
                setTranscript(prevTranscript => prevTranscript + event.results[event.results.length - 1][0].transcript + " ");
            };

            localRecognition.onerror = function (event) {
                console.error('Speech Recognition Error: ', event.error);
                localRecognition.stop();
            };

            setRecognition(localRecognition);
        } else {
            alert('Speech recognition not supported in this browser.');
        }
    };

    const stopDictation = () => {
        if (recognition) {
            recognition.stop();
        }
    };
    const discardReport = () => {
        navigate('/tire-inspection');
    };
    const generateReport = () => {
        // Implement report generation logic here
        alert('Report generated!');
    };


    return (
        <div>
            <h1>Enter Analysis Report for {reportName && <>{reportName}</>}</h1>
            <button onClick={discardReport} style={{ marginLeft: 'auto' }}>Discard Report</button>
            <p>Press "Start Dictation" to begin recording. Speak into your microphone, and the text will appear below.</p>
            <button onClick={startDictation}>Start Dictation</button>
            <button onClick={stopDictation}>Stop Dictation</button>
            <textarea id="inputField" placeholder="Your speech will appear here..." value={transcript} readOnly style={{ width: '100%', height: '100px', padding: '10px', marginTop: '10px', fontSize: '16px' }}></textarea>
            <h2>Manual Entry</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
    <label>
      Tire Pressure Left Front:
      <input type="number" name="tirePressureLeftFront" required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
    </label>
    <label>
      Tire Condition Left Front:
      <select name="tireConditionLeftFront" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
        <option value="Good">Good</option>
        <option value="Ok">Ok</option>
        <option value="Needs Replacement">Needs Replacement</option>
      </select>
    </label>
    <label>
      Tire Pressure Right Front:
      <input type="number" name="tirePressureRightFront" required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
    </label>
    <label>
      Tire Condition Right Front:
      <select name="tireConditionRightFront" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
        <option value="Good">Good</option>
        <option value="Ok">Ok</option>
        <option value="Needs Replacement">Needs Replacement</option>
      </select>
    </label>
    <label>
      Tire Pressure Left Rear:
      <input type="number" name="tirePressureLeftRear" required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
    </label>
    <label>
      Tire Condition Left Rear:
      <select name="tireConditionLeftRear" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
        <option value="Good">Good</option>
        <option value="Ok">Ok</option>
        <option value="Needs Replacement">Needs Replacement</option>
      </select>
    </label>
    <label>
      Tire Pressure Right Rear:
      <input type="number" name="tirePressureRightRear" required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
    </label>
    <label>
      Tire Condition Right Rear:
      <select name="tireConditionRightRear" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
        <option value="Good">Good</option>
        <option value="Ok">Ok</option>
        <option value="Needs Replacement">Needs Replacement</option>
      </select>
    </label>
    <label>
      Overall Tire Summary:
      <textarea name="overallTireSummary" maxLength="1000" style={{ marginLeft: '10px', padding: '5px', width: '300px', height: '100px' }} />
    </label>
    <label>
      Attach Images:
      <input type="file" multiple name="attachedImages" style={{ marginLeft: '10px', padding: '5px' }} />
    </label>
  </div>
  <button onClick={generateReport} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>Generate Report</button>
        </div>
    );
}

export default FillTyreReport;
