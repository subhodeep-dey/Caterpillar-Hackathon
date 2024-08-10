import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FillBrakeReport() {
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
                    Inspection ID:
                    <input type="text" name="inspectionID" placeholder="Enter Inspection ID" required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
                </label>
                <label>
                    Brake Fluid Level:
                    <select name="brakeFluidLevel" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Low">Low</option>
                    </select>
                </label>
                <label>
                    Brake Condition - Front:
                    <select name="brakeConditionFront" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Brake Condition - Rear:
                    <select name="brakeConditionRear" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Emergency Brake Condition:
                    <select name="emergencyBrakeCondition" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Low">Low</option>
                    </select>
                </label>
                <label>
                    Brake Overall Summary:
                    <textarea name="brakeOverallSummary" maxLength={1000} style={{ marginLeft: '10px', padding: '5px', width: '200px', height: '100px' }} placeholder="Provide overall summary..." />
                </label>
                <label>
                    Attach Images:
                    <input type="file" multiple name="attachedImages" style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
                </label>
            </div>

            <button onClick={generateReport} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>Generate Report</button>
        </div>
    );
}

export default FillBrakeReport;
