import * as ml5 from "ml5";
import Sketch from "react-p5";
import $ from 'jquery';
import {useEffect, useState} from "react";
import {drawKeypoints, drawSkeleton} from "../utils/poseVisualiser";

let poseNet;
let poses = [];
let video;

function modelReady() {
  $('#status').html('Model Loaded');
}

export default function PoseNet() {

  useEffect(() => {
    const timer = setInterval(() => {
      // analysePoses(poses, setPoseAnalysis);
    }, 500);
    return () => clearInterval(timer);
  });

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    let canvas = p5.createCanvas(500, 500).parent(canvasParentRef);
    canvas.id("canvasOutput")
    canvas.position(0,0);

    video = document.getElementById('videoInput')
    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady, {});
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
      poses = results;
    });
    // Hide the video element, and just show the canvas
    // video.hide();
  };

  const draw = (p5) => {
    p5.clear()

    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints(p5, poses);
    drawSkeleton(p5, poses);
  };

  return <>
      <p id="status">Loading model...</p>
      <Sketch setup={setup} draw={draw}/>
    </>;
}
