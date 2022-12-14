// A function to draw ellipses over the detected keypoints
export function drawKeypoints(p5, poses) {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        p5.fill(255, 255, 255);
        p5.noStroke();
        p5.ellipse(keypoint.position.x, keypoint.position.y, 3, 3);
      }
    }
  }
}

// A function to draw the skeletons
export function drawSkeleton(p5, poses) {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      p5.stroke(255, 255, 255);
      p5.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
