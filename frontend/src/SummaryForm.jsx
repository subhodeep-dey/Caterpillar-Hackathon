import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SummaryForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questionnaire } = location.state || { questionnaire: [] };

  const handleInputChange = (event, index) => {
    questionnaire[index].answer = event.target.value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://your-backend-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionnaire),
      });

      if (response.ok) {
        alert('Questionnaire submitted successfully!');
        navigate('/'); // Navigate back to the main page or another page after submission
      } else {
        alert('Failed to submit questionnaire.');
      }
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      alert('An error occurred while submitting the questionnaire.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Summary of Your Answers</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {questionnaire.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <label className="font-semibold block mb-2">{item.field}:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={item.answer}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-600 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SummaryForm;
