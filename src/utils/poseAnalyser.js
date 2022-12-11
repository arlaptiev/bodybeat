function norm(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
export function analysePoses(poses, setPoseAnalysis) {
  let poseAnalysis = {}
  console.log(poses)
  // if (poses.length > 0) {
  //   debugger;
  // }

  poseAnalysis['num_poses'] = poses.length

  poseAnalysis['poses'] = []
  for (const pose of poses) {
    debugger;
    let dict = {}

    let lw = pose['pose']['leftWrist'], ls = pose['pose']['leftShoulder'], rw = pose['pose']['rightWrist'], rs = pose['pose']['rightShoulder'];
    dict['left_arm_angle'] = {
      'value': (ls.y - lw.y) / norm(ls, rs),
      'confidence': lw.confidence * ls.confidence
    }

    poseAnalysis['poses'].push(dict)
  }

  setPoseAnalysis(poseAnalysis)
}

