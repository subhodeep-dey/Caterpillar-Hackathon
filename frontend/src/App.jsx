import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faMicrophone } from '@fortawesome/free-solid-svg-icons';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionnaire, setQuestionnaire] = useState([
    { question: "Enter the truck serial number ", field: "Truck Serial Number", answer: "" },
    { question: "Enter the truck model (e.g., 730, 730 EJ, 735, 745):", field: "Truck Model", answer: "" },
    { question: "Enter the inspector name:", field: "Inspector Name", answer: "" },
    { question: "Enter the inspection employee ID:", field: "Inspection Employee ID", answer: "" },
    { question: "Enter the date and time of inspection:", field: "Date & Time of Inspection", answer: "" },
    // Add the remaining questions here...
  ]);
  const navigate = useNavigate();  // Initialize useNavigate hook

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const strTime = `${hour}:${minute < 10 ? '0' : ''}${minute}`;

    const firstQuestion = {
      text: questionnaire[0].question,
      time: strTime,
      sender: 'bot',
    };

    setMessages([firstQuestion]);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input) return;

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const strTime = `${hour}:${minute < 10 ? '0' : ''}${minute}`;

    // User's message
    const userMessage = {
      text: input,
      time: strTime,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Store the user's answer to the current question
    const updatedQuestionnaire = [...questionnaire];
    updatedQuestionnaire[currentQuestionIndex].answer = input;
    setQuestionnaire(updatedQuestionnaire);

    setInput('');

    // Check if there are more questions to ask
    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      // Bot's response (next question)
      const botMessage = {
        text: updatedQuestionnaire[currentQuestionIndex + 1].question,
        time: strTime,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } else {
      // End of questionnaire, navigate to summary page
      navigate('/summary', { state: { questionnaire: updatedQuestionnaire } });
    }
  };

  const startDictation = () => {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.start();

      recognition.onresult = function (e) {
        setInput(e.results[0][0].transcript);
        recognition.stop();
      };

      recognition.onerror = function () {
        recognition.stop();
      };
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-xl">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="bg-gray-800 text-white p-4 rounded-t-lg flex items-center">
            <div>
              <h2 className="text-lg font-semibold">ChatBot</h2>
              <p className="text-sm">Answer the questions!</p>
            </div>
          </div>
          <div id="messageFormeight" className="p-4 overflow-y-auto h-96 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 p-4 rounded-b-lg">
            <form id="messageArea" className="flex" onSubmit={handleSubmit}>
              <input
                type="text"
                id="text"
                name="msg"
                placeholder="Type your answer..."
                autoComplete="off"
                className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <button
                type="button"
                id="dictate"
                className="bg-blue-500 text-white p-3 rounded-r-none hover:bg-blue-600"
                onClick={startDictation}
              >
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
              <button
                type="submit"
                id="send"
                className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600"
              >
                <FontAwesomeIcon icon={faLocationArrow} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
