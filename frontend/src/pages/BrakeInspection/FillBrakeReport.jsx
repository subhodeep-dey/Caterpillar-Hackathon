import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FillBrakeReport.css'

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
    const generateReport = async () => {
        try {
            const inspectionID = document.querySelector('input[name="inspectionID"]').value;
            const brakeFluidLevel = document.querySelector('select[name="brakeFluidLevel"]').value;
            const brakeConditionFront = document.querySelector('select[name="brakeConditionFront"]').value;
            const brakeConditionRear = document.querySelector('select[name="brakeConditionRear"]').value;
            const emergencyBrakeCondition = document.querySelector('select[name="emergencyBrakeCondition"]').value;
            const brakeOverallSummary = document.querySelector('textarea[name="brakeOverallSummary"]').value;
            const attachedImages = document.querySelector('input[name="attachedImages"]').files;
    
            const formData = new FormData();
            formData.append('inspectionID', inspectionID);
            formData.append('brakeFluidLevel', brakeFluidLevel);
            formData.append('brakeConditionFront', brakeConditionFront);
            formData.append('brakeConditionRear', brakeConditionRear);
            formData.append('emergencyBrakeCondition', emergencyBrakeCondition);
            formData.append('brakeOverallSummary', brakeOverallSummary);
    

    
            const response = await fetch('http://localhost:3000/brake-inspections', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                alert('Report generated successfully!');
                navigate('/brake-inspection');
            } else {
                const errorText = await response.text();
                console.error('Failed to generate report:', response.status, errorText);
                alert('Failed to generate report.');
            }
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Error generating report.');
        }
    };
    

    return (
        <div className="container">
            <h1>Enter Analysis Report for {reportName && <>{reportName}</>}</h1>
            <button className="discard-button" onClick={discardReport}>Discard Report</button>
            <p>Press "Start Dictation" to begin recording. Speak into your microphone, and the text will appear below.</p>
            <div className="button-row">
                <button onClick={startDictation}>Start Dictation</button>
                <button onClick={stopDictation}>Stop Dictation</button>
            </div>
            <textarea
                id="inputField"
                placeholder="Your speech will appear here..."
                value={transcript}
                style={{ width: '100%', height: '100px', padding: '10px', marginTop: '10px', fontSize: '16px' }}
            ></textarea>
            <h2>Manual Entry</h2>
            <div className="form-row">
                <label>
                    Inspection ID:
                    <input
                        type="text"
                        name="inspectionID"
                        placeholder="Enter Inspection ID"
                        required
                        style={{ padding: '5px', width: '100%' }}
                    />
                </label>
                <label>
                    Brake Fluid Level:
                    <select
                        name="brakeFluidLevel"
                        required
                        style={{ padding: '5px', width: '100%' }}
                    >
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Low">Low</option>
                    </select>
                </label>
                <label>
                    Brake Condition - Front:
                    <select
                        name="brakeConditionFront"
                        required
                        style={{ padding: '5px', width: '100%' }}
                    >
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Brake Condition - Rear:
                    <select
                        name="brakeConditionRear"
                        required
                        style={{ padding: '5px', width: '100%' }}
                    >
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Emergency Brake Condition:
                    <select
                        name="emergencyBrakeCondition"
                        required
                        style={{ padding: '5px', width: '100%' }}
                    >
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Low">Low</option>
                    </select>
                </label>
                <label>
                    Brake Overall Summary:
                    <textarea
                        name="brakeOverallSummary"
                        maxLength={1000}
                        style={{ padding: '10px', marginTop: '10px', fontSize: '16px', width: '100%', height: '100px' }}
                        placeholder="Provide overall summary..."
                    />
                </label>
                <label>
                    Attach Images:
                    <input
                        type="file"
                        multiple
                        name="attachedImages"
                        style={{ padding: '5px', width: '100%' }}
                    />
                </label>
            </div>
            <button className="generate-report" onClick={generateReport} style={{ padding: '10px', marginTop: '10px', fontSize: '16px' }}>Generate Report</button>
        </div>

    );
}

export default FillBrakeReport;
