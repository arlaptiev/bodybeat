import React, {useEffect} from "react";
// import cv from "@techstark/opencv-js";
import {loadHaarFaceModels} from "../utils/faceDetect";

// window.cv = cv;

let video;
let cap;

export default function Flow(props) {
  //
  // useEffect(() => {
  //
  //   loadHaarFaceModels()
  //
  //   video = document.getElementById('videoInput');
  //   console.log('video: ', 'videoInput')
  //   cap = new cv.VideoCapture(video);
  //   console.log('cv.mat', cv.Mat)
  //   debugger;
  //   // take first frame of the video
  //   let frame1 = new cv.Mat(video.height, video.width, cv.CV_8UC4);
  //   cap.read(frame1);
  //
  //   let prvs = new cv.Mat();
  //   cv.cvtColor(frame1, prvs, cv.COLOR_RGBA2GRAY);
  //   frame1.delete();
  //   let hsv = new cv.Mat();
  //   let hsv0 = new cv.Mat(video.height, video.width, cv.CV_8UC1);
  //   let hsv1 = new cv.Mat(video.height, video.width, cv.CV_8UC1, new cv.Scalar(255));
  //   let hsv2 = new cv.Mat(video.height, video.width, cv.CV_8UC1);
  //   let hsvVec = new cv.MatVector();
  //   hsvVec.push_back(hsv0);
  //   hsvVec.push_back(hsv1);
  //   hsvVec.push_back(hsv2);
  //
  //   let frame2 = new cv.Mat(video.height, video.width, cv.CV_8UC4);
  //   let next = new cv.Mat(video.height, video.width, cv.CV_8UC1);
  //   let flow = new cv.Mat(video.height, video.width, cv.CV_32FC2);
  //   let flowVec = new cv.MatVector();
  //   let mag = new cv.Mat(video.height, video.width, cv.CV_32FC1);
  //   let ang = new cv.Mat(video.height, video.width, cv.CV_32FC1);
  //   let rgb = new cv.Mat(video.height, video.width, cv.CV_8UC3);
  //
  //   const FPS = 30;
  //   const streaming = true // ???
  //
  //   function useProcessVideo() {
  //     let begin = Date.now();
  //
  //     try {
  //       // ???
  //       // if (!streaming) {
  //       //   // clean and stop.
  //       //   prvs.delete(); hsv.delete(); hsv0.delete(); hsv1.delete(); hsv2.delete();
  //       //   hsvVec.delete(); frame2.delete(); flow.delete(); flowVec.delete(); next.delete();
  //       //   mag.delete(); ang.delete(); rgb.delete();
  //       //   return;
  //       // }
  //
  //       // start processing.
  //       cap.read(frame2);
  //       cv.cvtColor(frame2, next, cv.COLOR_RGBA2GRAY);
  //       cv.calcOpticalFlowFarneback(prvs, next, flow, 0.5, 3, 15, 3, 5, 1.2, 0);
  //       cv.split(flow, flowVec);
  //       let u = flowVec.get(0);
  //       let v = flowVec.get(1);
  //       cv.cartToPolar(u, v, mag, ang);
  //       u.delete();
  //       v.delete();
  //       ang.convertTo(hsv0, cv.CV_8UC1, 180 / Math.PI / 2);
  //       cv.normalize(mag, hsv2, 0, 255, cv.NORM_MINMAX, cv.CV_8UC1);
  //       cv.merge(hsvVec, hsv);
  //       cv.cvtColor(hsv, rgb, cv.COLOR_HSV2RGB);
  //       cv.imshow('canvasOutput', rgb);
  //       next.copyTo(prvs);
  //
  //     } catch (err) {
  //       console.log('ERROR')
  //       console.log(err)
  //       // utils.printError(err);
  //     }
  //
  //     // schedule the next one.
  //     let delay = 1000 / FPS - (Date.now() - begin);
  //     // useEffect(() => {
  //       const timer = setTimeout(useProcessVideo, delay);
  //       // return () => clearTimeout(timer);
  //     // }, []);
  //
  //   }
  //
  //   // schedule the first one.
  //   // useEffect(() => {
  //     const timer = setTimeout(useProcessVideo, 1000 / FPS);
  //     // return () => clearTimeout(timer);
  //   // }, []);
  // }, [])

  return <>
    {/*<video id="videoInput"/>*/}
    {/*<video id="videoInput" width="320" height="240" muted="" src="https://docs.opencv.org/4.x/box.mp4"/>*/}
  </>

};