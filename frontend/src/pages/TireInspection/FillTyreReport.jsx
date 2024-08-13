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
      setTranscript(e.target.value);
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

const stopDictation = async () => {
  if (recognition) {
      recognition.stop();
  }

  try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyse-speech/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              inspectionType: 'tire',
              message: transcript
          })
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Speech analysis result:', result);

        if (result.success && result.parsedData) {
            setFormData({
                tirePressureLeftFront: result.parsedData.tirePressureLeftFront,
                tirePressureRightFront: result.parsedData.tirePressureRightFront,
                tireConditionLeftFront: result.parsedData.tireConditionLeftFront,
                tireConditionRightFront: result.parsedData.tireConditionRightFront,
                tirePressureLeftRear: result.parsedData.tirePressureLeftRear,
                tirePressureRightRear: result.parsedData.tirePressureRightRear,
                tireConditionLeftRear: result.parsedData.tireConditionLeftRear,
                tireConditionRightRear: result.parsedData.tireConditionRightRear,
                overallTireSummary: result.parsedData.overallTireSummary,
                attachedImages: result.parsedData.attachedImages || []
            });
          } else {
            console.error('Failed to process speech analysis:', result.error);
            alert('Failed to process speech analysis.');
        }
    } else {
        const errorText = await response.text();
        console.error('Failed to analyze speech:', response.status, errorText);
        alert('Failed to analyze speech.');
    }
} catch (error) {
    console.error('Error analyzing speech:', error);
    alert('Error analyzing speech.');
}
};


    const discardReport = () => {
        navigate('/tire-inspection');
    };

    const generateReport = async () => {
      try {
          const inspectionID = "64d4a098ab987c12a45e6123";
          const dataToSend = {
              inspectionID,
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
  
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tire-inspections`, {
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
                onChange={handleChange}
                style={{ width: '100%', height: '100px', padding: '10px', marginTop: '10px', fontSize: '16px' }}
            ></textarea>
            <h2>Manual Entry</h2>
            <div className="form-row">
                <label>
                    Tire Pressure Left Front:
                    <input
                        type="number"
                        name="tirePressureLeftFront"
                        value={formData.tirePressureLeftFront}
                        onChange={handleChange}
                        required
                        style={{ padding: '5px', width: '100%' }}
                    />
                </label>
                <label>
                    Tire Condition Left Front:
                    <select
                        name="tireConditionLeftFront"
                        value={formData.tireConditionLeftFront}
                        onChange={handleChange}
                        required
                        style={{ padding: '5px', width: '100%' }}
                    >
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Tire Pressure Right Front:
                    <input
                        type="number"
                        name="tirePressureRightFront"
                        value={formData.tirePressureRightFront}
                        onChange={handleChange}
                        required
                        style={{ padding: '5px', width: '100%' }}
                    />
                </label>
                <label>
                    Tire Condition Right Front:
                    <select
                        name="tireConditionRightFront"
                        value={formData.tireConditionRightFront}
                        onChange={handleChange}
                        required
                        style={{ padding: '5px', width: '100%' }}
                    >
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Tire Pressure Left Rear:
                    <input
                        type="number"
                        name="tirePressureLeftRear"
                        value={formData.tirePressureLeftRear}
                        onChange={handleChange}
                        required
                        style={{ padding: '5px', width: '100%' }}
                    />
                </label>
                <label>
                    Tire Condition Left Rear:
                    <select
                        name="tireConditionLeftRear"
                        value={formData.tireConditionLeftRear}
                        onChange={handleChange}
                        required
                        style={{ padding: '5px', width: '100%' }}
                    >
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Tire Pressure Right Rear:
                    <input
                        type="number"
                        name="tirePressureRightRear"
                        value={formData.tirePressureRightRear}
                        onChange={handleChange}
                        required
                        style={{ padding: '5px', width: '100%' }}
                    />
                </label>
                <label>
                    Tire Condition Right Rear:
                    <select
                        name="tireConditionRightRear"
                        value={formData.tireConditionRightRear}
                        onChange={handleChange}
                        required
                        style={{ padding: '5px', width: '100%' }}
                    >
                        <option value="Good">Good</option>
                        <option value="Ok">Ok</option>
                        <option value="Needs Replacement">Needs Replacement</option>
                    </select>
                </label>
                <label>
                    Overall Tire Summary:
                    <textarea
                        name="overallTireSummary"
                        value={formData.overallTireSummary}
                        onChange={handleChange}
                        maxLength="1000"
                        style={{ padding: '10px', marginTop: '10px', fontSize: '16px', width: '100%', height: '100px' }}
                    />
                </label>
            </div>
            <button className="generate-report" onClick={generateReport} style={{ padding: '10px', marginTop: '10px', fontSize: '16px' }}>Generate Report</button>
        </div>

    );
}

export default FillTyreReport;