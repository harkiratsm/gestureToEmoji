import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import { drawHand } from "./neuraldraw";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const images = { thumbs_up: thumbs_up, victory: victory };

  const runHandpose = async () => {
    const net = await handpose.load();
    // console.log("Handpose model loaded.");
    setInterval(() => {
      prediction(net);
    }, 100);
  };

  const prediction = async (net) => {
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
      console.log(hand);
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
          setEmoji(gesture.gestures[maxConfidence].name);
          console.log(emoji);
          // console.log(gesture.gestures[maxConfidence].name);
        }
      }else {
        setEmoji(null);
      }
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };
  useEffect(() => {
    runHandpose();
  }, []);
  return (
    <div className="App">
    <header className="App-header">
  
      {/* className="styledcompo" */}
        <Webcam ref={webcamRef}  className="styledcompo" />
        <canvas ref={canvasRef}  className="styledcompo" />
      
      {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 400,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}
        </header>
      {/* <Paper variant="outlined"  elevation={8} className="feature">
      <Button variant="outlined">
        Delete
      </Button>
      </Paper> */}
    </div>
  );
}

export default App;
