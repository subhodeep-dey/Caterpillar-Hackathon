import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./FillReport.css";

function FillReport() {
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
        navigate('/reports');
    };
    const generateReport = () => {
        // Implement report generation logic here
        alert('Report generated!');
    };


    return (
        <div className="container">
            <button className="discard-button" onClick={discardReport}>Discard Report</button>
            <h1>Enter Analysis Report for {reportName && <>{reportName}</>}</h1>
            <p>Press "Start Dictation" to begin recording. Speak into your microphone, and the text will appear below.</p>
            <div className="button-row">
                <button onClick={startDictation}>Start Dictation</button>
                <button onClick={stopDictation}>Stop Dictation</button>
            </div>
            <textarea id="inputField" placeholder="Your speech will appear here..." value={transcript} readOnly style={{ width: '100%', height: '100px', padding: '10px', marginTop: '10px', fontSize: '16px' }}></textarea>
            <h2>Manual Entry</h2>
            <div className="form-row">
                <label>
                    ASSET:
                    <input type="text" name="asset" style={{ padding: '5px', width: '100%' }} />
                </label>
                <label>
                    REPORT NAME:
                    <input type="text" name="reportName" style={{ padding: '5px', width: '100%' }} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    CONDITION:
                    <input type="text" name="condition" style={{ padding: '5px', width: '100%' }} />
                </label>
                <label>
                    DATE:
                    <input type="date" name="date" style={{ padding: '5px', width: '100%' }} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    ACTION:
                    <input type="text" name="action" style={{ padding: '5px', width: '100%' }} />
                </label>
            </div>
            <button className="generate-report" onClick={generateReport}>Generate Report</button>
        </div>
    );
    
      
}

export default FillReport;
