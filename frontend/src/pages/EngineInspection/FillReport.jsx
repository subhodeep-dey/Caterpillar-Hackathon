import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FillEngineReport() {
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
            const rustDentOrDamage = document.querySelector('input[name="rustDentOrDamage"]').checked ? 'Yes' : 'No';
            const rustDentOrDamageNotes = document.querySelector('textarea[name="rustDentOrDamageNotes"]').value;
            const engineOilCondition = document.querySelector('select[name="engineOilCondition"]').value;
            const engineOilColor = document.querySelector('select[name="engineOilColor"]').value;
            const brakeFluidCondition = document.querySelector('select[name="brakeFluidCondition"]').value;
            const brakeFluidColor = document.querySelector('select[name="brakeFluidColor"]').value;
            const oilLeakInEngine = document.querySelector('input[name="oilLeakInEngine"]').checked ? 'Yes' : 'No';
            const engineOverallSummary = document.querySelector('textarea[name="engineOverallSummary"]').value;
            const attachedImages = document.querySelector('input[name="attachedImages"]').files;
    
            const formData = new FormData();
            formData.append('inspectionID', inspectionID);
            formData.append('rustDentOrDamage', rustDentOrDamage);
            formData.append('rustDentOrDamageNotes', rustDentOrDamageNotes);
            formData.append('engineOilCondition', engineOilCondition);
            formData.append('engineOilColor', engineOilColor);
            formData.append('brakeFluidCondition', brakeFluidCondition);
            formData.append('brakeFluidColor', brakeFluidColor);
            formData.append('oilLeakInEngine', oilLeakInEngine);
            formData.append('engineOverallSummary', engineOverallSummary);
    
            const response = await fetch('http://localhost:3000/engine-inspections', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                alert('Report generated successfully!');
                navigate('/engine-inspection');
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
        <div>
            <h1>Enter Analysis Report for {reportName && <>{reportName}</>}</h1>
            <button onClick={discardReport} style={{ marginLeft: 'auto' }}>Discard Report</button>
            <p>Press "Start Dictation" to begin recording. Speak into your microphone, and the text will appear below.</p>
            <button onClick={startDictation}>Start Dictation</button>
            <button onClick={stopDictation}>Stop Dictation</button>
            <textarea id="inputField" placeholder="Your speech will appear here..." value={transcript}  style={{ width: '100%', height: '100px', padding: '10px', marginTop: '10px', fontSize: '16px' }}></textarea>
            <h2>Manual Entry</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                <label>
                    Inspection ID:
                    <input type="text" name="inspectionID" placeholder="Enter Inspection ID" required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
                </label>
                <label>
                    Rust, Dent, or Damage:
                    <input type="checkbox" name="rustDentOrDamage" required style={{ marginLeft: '10px', padding: '5px' }} />
                </label>
                <label>
                    Rust, Dent, or Damage Notes:
                    <textarea name="rustDentOrDamageNotes" maxLength={1000} style={{ marginLeft: '10px', padding: '5px', width: '200px', height: '100px' }} placeholder="Detail any noted damages..." />
                </label>
                <label>
                    Engine Oil Condition:
                    <select name="engineOilCondition" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Bad">Bad</option>
                    </select>
                </label>
                <label>
                    Engine Oil Color:
                    <select name="engineOilColor" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Clean">Clean</option>
                        <option value="Brown">Brown</option>
                        <option value="Black">Black</option>
                    </select>
                </label>
                <label>
                    Brake Fluid Condition:
                    <select name="brakeFluidCondition" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Bad">Bad</option>
                    </select>
                </label>
                <label>
                    Brake Fluid Color:
                    <select name="brakeFluidColor" required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Clean">Clean</option>
                        <option value="Brown">Brown</option>
                        <option value="Black">Black</option>
                    </select>
                </label>
                <label>
                    Oil Leak in Engine:
                    <input type="checkbox" name="oilLeakInEngine" required style={{ marginLeft: '10px', padding: '5px' }} />
                </label>
                <label>
                    Engine Overall Summary:
                    <textarea name="engineOverallSummary" maxLength={1000} style={{ marginLeft: '10px', padding: '5px', width: '200px', height: '100px' }} placeholder="Provide overall summary..." />
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

export default FillEngineReport;
