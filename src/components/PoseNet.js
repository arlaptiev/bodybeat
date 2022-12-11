import * as ml5 from "ml5";
import Sketch from "react-p5";
import $ from 'jquery';
import {useEffect, useState} from "react";
import {analysePoses} from "../utils/poseAnalyser";
import {drawKeypoints, drawSkeleton} from "../utils/poseVisualiser";
import Visuals from "./Visuals";

let x = 50;
let y = 50;
let poseNet;
let poses = [];
let video;
let width = 500;
let height = 500;

function modelReady() {
  $('#status').html('Model Loaded');
}

export default function PoseNet() {

  const [poseAnalysis, setPoseAnalysis] = useState({})

  useEffect(() => {
    const timer = setInterval(() => {
      analysePoses(poses, setPoseAnalysis);
    }, 500);
    return () => clearInterval(timer);
  });

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);

    // p5.createCanvas(640, 480);
    video = p5.createCapture(p5.VIDEO);
    video.size(width, height);
    // setVideo(video);


    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady, {});
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
      poses = results;
    });
    // Hide the video element, and just show the canvas
    // video_.hide();
  };

  const draw = (p5) => {
    let video = p5._elements[1]
    if (video === undefined) {
      debugger;
    }

    p5.image(video, 0, 0, p5.width, p5.height);

    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints(p5, poses);
    drawSkeleton(p5, poses);

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    x++;
  };

  return <>
      <Visuals poseAnalysis={poseAnalysis}/>
      <p id="status">Loading model...</p>
      <Sketch setup={setup} draw={draw}/>
    </>;
}
