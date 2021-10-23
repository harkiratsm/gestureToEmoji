import React ,{useEffect,useRef} from "react"
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose"
import Webcam from 'react-webcam';
import { drawHand } from "./neuraldraw";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    setInterval(() => {
      prediction(net)
    }, 100);
  };

  
  const prediction = async (net) =>{
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const hand = await net.estimateHands(video);
      console.log(hand)
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );  
          console.log(gesture.gestures[maxConfidence].name);
        }
      }
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
    
  }
  useEffect(()=>{
    runHandpose();
  },[])
  return (
    <div>
      <Webcam ref={webcamRef} className="styledcompo"/>
      <canvas ref={canvasRef} className="styledcompo"/>
    </div>
    
    
  );
}

export default App; 