import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FillTyreReport() {
    const location = useLocation();
    const navigate = useNavigate();
    const [recognition, setRecognition] = useState(null);
    const [transcript, setTranscript] = useState('');
    const { reportName } = location.state || {};
    const [formData, setFormData] = useState({
        tirePressureLeftFront: '',
        tirePressureRightFront: '',
        tireConditionLeftFront: 'Good',
        tireConditionRightFront: 'Good',
        tirePressureLeftRear: '',
        tirePressureRightRear: '',
        tireConditionLeftRear: 'Good',
        tireConditionRightRear: 'Good',
        overallTireSummary: '',
        attachedImages: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

    const generateReport = async () => {
      try {
          const inspectionId = "64d4a098ab987c12a45e6123"; // You might want to generate this dynamically or get it from somewhere
          const dataToSend = {
              inspectionId,
              tirePressureLeftFront: parseInt(formData.tirePressureLeftFront),
              tirePressureRightFront: parseInt(formData.tirePressureRightFront),
              tireConditionLeftFront: formData.tireConditionLeftFront,
              tireConditionRightFront: formData.tireConditionRightFront,
              tirePressureLeftRear: parseInt(formData.tirePressureLeftRear),
              tirePressureRightRear: parseInt(formData.tirePressureRightRear),
              tireConditionLeftRear: formData.tireConditionLeftRear,
              tireConditionRightRear: formData.tireConditionRightRear,
              overallTireSummary: formData.overallTireSummary
          };
  
          const response = await fetch('http://localhost:3000/tire-inspections', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToSend)
          });
  
          if (response.ok) {
              alert('Report generated successfully!');
              navigate('/tire-inspection');
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
            <textarea id="inputField" placeholder="Your speech will appear here..." value={transcript} readOnly style={{ width: '100%', height: '100px', padding: '10px', marginTop: '10px', fontSize: '16px' }}></textarea>
            <h2>Manual Entry</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                <label>
                    Tire Pressure Left Front:
                    <input type="number" name="tirePressureLeftFront" value={formData.tirePressureLeftFront} onChange={handleChange} required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
                </label>
                <label>
                    Tire Condition Left Front:
                    <select name="tireConditionLeftFront" value={formData.tireConditionLeftFront} onChange={handleChange} required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Tire Pressure Right Front:
                    <input type="number" name="tirePressureRightFront" value={formData.tirePressureRightFront} onChange={handleChange} required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
                </label>
                <label>
                    Tire Condition Right Front:
                    <select name="tireConditionRightFront" value={formData.tireConditionRightFront} onChange={handleChange} required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Tire Pressure Left Rear:
                    <input type="number" name="tirePressureLeftRear" value={formData.tirePressureLeftRear} onChange={handleChange} required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
                </label>
                <label>
                    Tire Condition Left Rear:
                    <select name="tireConditionLeftRear" value={formData.tireConditionLeftRear} onChange={handleChange} required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Tire Pressure Right Rear:
                    <input type="number" name="tirePressureRightRear" value={formData.tirePressureRightRear} onChange={handleChange} required style={{ marginLeft: '10px', padding: '5px', width: '200px' }} />
                </label>
                <label>
                    Tire Condition Right Rear:
                    <select name="tireConditionRightRear" value={formData.tireConditionRightRear} onChange={handleChange} required style={{ marginLeft: '10px', padding: '5px', width: '210px' }}>
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Overall Tire Summary:
                    <textarea name="overallTireSummary" value={formData.overallTireSummary} onChange={handleChange} maxLength="1000" style={{ marginLeft: '10px', padding: '5px', width: '300px', height: '100px' }} />
                </label>
            </div>
            <button onClick={generateReport} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>Generate Report</button>
        </div>
    );
}

export default FillTyreReport;