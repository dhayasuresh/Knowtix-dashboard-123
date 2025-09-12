// components/VoiceAssistant.js
import React, { useState, useEffect, useRef } from 'react';

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef(null);
  
  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        processCommand(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      setTranscript('');
      setResponse('');
      recognitionRef.current.start();
    }
  };
  
  const processCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    let responseText = '';
    
    if (lowerCommand.includes('go to dashboard')) {
      window.location.href = '/';
      responseText = 'Navigating to dashboard';
    } else if (lowerCommand.includes('go to materials') || lowerCommand.includes('go to my files')) {
      window.location.href = '/my-files';
      responseText = 'Navigating to my files';
    } else if (lowerCommand.includes('go to quiz') || lowerCommand.includes('go to assessments')) {
      window.location.href = '/assessments';
      responseText = 'Navigating to assessments';
    } else if (lowerCommand.includes('go to notes')) {
      // Navigate to notes section
      responseText = 'Navigating to notes';
    } else if (lowerCommand.includes('go to calendar')) {
      // Navigate to calendar
      responseText = 'Navigating to calendar';
    } else if (lowerCommand.includes('go to collaboration')) {
      window.location.href = '/collaboration';
      responseText = 'Navigating to collaboration';
    } else if (lowerCommand.includes('go to timer')) {
      // Navigate to timer
      responseText = 'Navigating to timer';
    } else if (lowerCommand.includes('go to math tools')) {
      window.location.href = '/formulas';
      responseText = 'Navigating to math tools';
    } else if (lowerCommand.includes('go to ai content')) {
      window.location.href = '/ai-content';
      responseText = 'Navigating to AI content';
    } else if (lowerCommand.includes('go to gk')) {
      // Navigate to general knowledge
      responseText = 'Navigating to general knowledge';
    } else if (lowerCommand.includes('go to settings')) {
      window.location.href = '/settings';
      responseText = 'Navigating to settings';
    } else if (lowerCommand.includes('create folder')) {
      // Create folder functionality
      responseText = 'Creating a new folder';
    } else if (lowerCommand.includes('new note')) {
      // Create new note functionality
      responseText = 'Creating a new note';
    } else if (lowerCommand.includes('start quiz')) {
      // Start quiz functionality
      responseText = 'Starting a new quiz';
    } else if (lowerCommand.includes('dark mode')) {
      // Enable dark mode
      document.body.classList.add('dark-mode');
      responseText = 'Enabling dark mode';
    } else if (lowerCommand.includes('light mode')) {
      // Enable light mode
      document.body.classList.remove('dark-mode');
      responseText = 'Enabling light mode';
    } else {
      responseText = 'Command not recognized. Please try again.';
    }
    
    setResponse(responseText);
    
    // Speak the response
    speakResponse(responseText);
  };
  
  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <div className="voice-assistant">
      <div className="voice-assistant-container">
        <div className="voice-status">
          <button 
            className={`voice-btn ${listening ? 'listening' : ''}`}
            onClick={startListening}
            disabled={listening}
          >
            <i className="fas fa-microphone"></i>
          </button>
          <div className="voice-indicator">
            {listening ? 'Listening...' : 'Voice Assistant'}
          </div>
        </div>
        
        {transcript && (
          <div className="voice-transcript">
            <p><strong>You said:</strong> {transcript}</p>
          </div>
        )}
        
        {response && (
          <div className="voice-response">
            <p><strong>Response:</strong> {response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;