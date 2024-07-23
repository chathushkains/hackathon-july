"use client";

import 'regenerator-runtime/runtime';
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert('Your browser does not support speech recognition.');
    }
  }, [browserSupportsSpeechRecognition]);

  const handleCommand = async (command: string) => {
    console.log('Command    : ', command);
    try {
        const response = await fetch('http://localhost:3000/api/test/speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: command }),
        });
  
        const result = await response.json();
  
        // Handle the response from the backend
        console.log(result);
    } catch (error) {
        console.error('Error making API call:', error);
    }

  };

  useEffect(() => {
    if (transcript) {
      handleCommand(transcript);
    }
  }, [transcript]);

  return (
    <div className='bg-gray-900 p-4'>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">Speech to Text Command Processor</h1>
      <p className='mb-4'>Microphone : {listening ? 'on' : 'off'}</p>
      <div className='mb-4'>
        <button onClick={SpeechRecognition.startListening as unknown as any} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Start</button>
        <button onClick={SpeechRecognition.stopListening} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Stop</button>
        <button onClick={resetTranscript} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Reset</button>
      </div>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechToText;
