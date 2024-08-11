import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FillVehicleReport() {
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
        navigate('/vehicle');
    };
    const generateReport = async () => {
        try {
            const serialNumber = document.querySelector('input[name="serialNumber"]').value;
            const model = document.querySelector('input[name="model"]').value;
            const customerName = document.querySelector('input[name="customerName"]').value;
            const catCustomerID = document.querySelector('input[name="catCustomerID"]').value;
    
            const formData = new FormData();
            formData.append('serialNumber', serialNumber);
            formData.append('model', model);
            formData.append('customerName', customerName);
            formData.append('catCustomerID', catCustomerID);
    
            const response = await fetch('http://localhost:3000/vehicle-inspections', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                alert('Report generated successfully!');
                navigate('/vehicle-inspection');
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
                    Serial Number:
                    <input
                        type="text"
                        name="serialNumber"
                        required
                        style={{ padding: '5px', width: '100%' }}
                        maxLength={50}
                    />
                </label>
                <label>
                    Model:
                    <input
                        type="text"
                        name="model"
                        required
                        style={{ padding: '5px', width: '100%' }}
                        maxLength={50}
                    />
                </label>
                <label>
                    Customer Name:
                    <input
                        type="text"
                        name="customerName"
                        required
                        style={{ padding: '5px', width: '100%' }}
                        maxLength={100}
                    />
                </label>
                <label>
                    CAT Customer ID:
                    <input
                        type="text"
                        name="catCustomerID"
                        required
                        style={{ padding: '5px', width: '100%' }}
                        maxLength={50}
                    />
                </label>
            </div>

            <button className="generate-report" onClick={generateReport} style={{ padding: '10px', marginTop: '10px', fontSize: '16px' }}>Generate Report</button>
        </div>

    );
}

export default FillVehicleReport;
