import React, { useEffect, useState } from "react";
import "./app.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";

function App() {
  const [language, setLanguage] = useState("en-US");

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (transcript.toLowerCase().includes("clear")) {
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: language });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container">
      <h1 className="heading">Speech to Text Converter</h1>
      <p>A React hook that converts speech to text</p>

      <select
        className="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en-US">English (US)</option>
        <option value="hi-IN">Hindi (India)</option>
        <option value="fr-FR">French</option>
        <option value="es-ES">Spanish</option>
      </select>

      <div className={`mic-icon ${listening ? "glow" : ""}`}>
        <FaMicrophone />
      </div>

      <div className="maincontainer">{transcript || "Start speaking..."}</div>

      <div className="btns">
        <button className="copy" onClick={handleCopy}>
          Copy
        </button>
        <button className="start" onClick={handleStart}>
          Start Listening
        </button>
        <button className="stop" onClick={handleStop}>
          Stop Listening
        </button>
        <button className="reset" onClick={resetTranscript}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
