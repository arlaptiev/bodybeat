export default function Visuals(props) {
  let analysis = props.poseAnalysis;

  return <>
    <p>Detected {analysis['num_poses']} poses.</p>
    <p>{JSON.stringify(analysis)}</p>
  </>
}