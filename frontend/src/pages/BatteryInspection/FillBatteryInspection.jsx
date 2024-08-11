import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FillBatteryInspection.css';

function FillBatteryReport() {
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

    const stopDictation = async () => {
        if (recognition) {
            recognition.stop();
        }

        try {
            const response = await fetch('http://localhost:3000/analyse-speech/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inspectionType: 'battery',
                    message: transcript
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const parsedData = data.parsedData;
                    document.querySelector('input[name="batteryMake"]').value = parsedData.batteryMake;
                    document.querySelector('input[name="batteryReplacementDate"]').value = parsedData.batteryReplacementDate;
                    document.querySelector('input[name="batteryVoltage"]').value = parsedData.batteryVoltage;
                    document.querySelector('select[name="batteryWaterLevel"]').value = parsedData.batteryWaterLevel;
                    document.querySelector('input[name="batteryCondition"]').checked = parsedData.batteryCondition;
                    document.querySelector('input[name="batteryLeakOrRust"]').checked = parsedData.batteryLeakOrRust;
                    document.querySelector('textarea[name="batteryOverallSummary"]').value = parsedData.batteryOverallSummary;
                } else {
                    alert('Failed to process speech data.');
                }
            } else {
                const errorData = await response.json();
                console.error('Failed to process speech data:', response.status, errorData);
                alert(`Failed to process speech data: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error processing speech data:', error);
            alert('Error processing speech data.');
        }
    };

    const discardReport = () => {
        navigate('/battery-inspection');
    };

    const generateReport = async () => {
        try {
            const inspectionID = "64d4a098ab987c12a45e6123"; 
            const batteryMake = document.querySelector('input[name="batteryMake"]').value;
            const batteryReplacementDate = document.querySelector('input[name="batteryReplacementDate"]').value;
            const batteryVoltage = document.querySelector('input[name="batteryVoltage"]').value;
            const batteryWaterLevel = document.querySelector('select[name="batteryWaterLevel"]').value;
            const batteryCondition = document.querySelector('input[name="batteryCondition"]').checked;
            const batteryLeakOrRust = document.querySelector('input[name="batteryLeakOrRust"]').checked;
            const batteryOverallSummary = document.querySelector('textarea[name="batteryOverallSummary"]').value;

            if (!inspectionID || !batteryMake || !batteryReplacementDate || !batteryVoltage || !batteryWaterLevel) {
                alert('Please fill all required fields.');
                return;
            }

            const formData = {
                inspectionID,
                batteryMake,
                batteryReplacementDate,
                batteryVoltage,
                batteryWaterLevel,
                batteryCondition,
                batteryLeakOrRust,
                batteryOverallSummary
            };

            const response = await fetch('http://localhost:3000/battery-inspections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Report generated successfully!');
                navigate('/battery-inspection');
            } else {
                const errorData = await response.json();
                console.error('Failed to generate report:', response.status, errorData);
                alert(`Failed to generate report: ${errorData.message}`);
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
                onChange={(event) => setTranscript(event.target.value)}
                style={{ width: '100%', height: '100px', padding: '10px', marginTop: '10px', fontSize: '16px' }}
            ></textarea>
            <h2>Manual Entry</h2>
            <div className="form-row">
                <label>
                    Inspection ID:
                    <input
                        type="text"
                        name="inspectionID"
                        value="64d4a098ab987c12a45e6123" 
                        readOnly
                        style={{ padding: '5px', width: '100%' }}
                    />
                </label>
                <label>
                    Battery Make:
                    <input
                        type="text"
                        name="batteryMake"
                        required
                        style={{ padding: '5px', width: '100%' }}
                        maxLength={50}
                    />
                </label>
                <label>
                    Battery Replacement Date:
                    <input
                        type="date"
                        name="batteryReplacementDate"
                        required
                        style={{ padding: '5px', width: '100%' }}
                    />
                </label>
                <label>
                    Battery Voltage:
                    <input
                        type="number"
                        name="batteryVoltage"
                        required
                        style={{ padding: '5px', width: '100%' }}
                    />
                </label>
                <label>
                    Battery Water Level:
                    <select
                        name="batteryWaterLevel"
                        required
                        style={{ padding: '5px', width: '100%' }}
                    >
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Low">Low</option>
                    </select>
                </label>
                <label className="check-box" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <p>Battery Condition (Check = Good):</p>
                    <input type="checkbox" name="batteryCondition" required />
                </label>
                <label className="check-box" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <p>Battery Leak or Rust (Check = Yes):</p>
                    <input type="checkbox" name="batteryLeakOrRust" required />
                </label>
                <label>
                    Battery Overall Summary:
                    <textarea
                        name="batteryOverallSummary"
                        maxLength={1000}
                        style={{ padding: '10px', marginTop: '10px', fontSize: '16px', width: '100%', height: '100px' }}
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

export default FillBatteryReport;