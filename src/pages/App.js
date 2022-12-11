import { useEffect } from 'react';
import Player from '../utils/player';
import Selector from '../utils/selector';

function App() {
  const tracks = [
    {filename: '130_Cm_Melodic_SPFT_126_05.wav'},
    {filename: '130_Synth_Loop_15_134_SP.wav'}
  ]
  const options = {
    bpm: 130,
    // barLength: 4000,
  }

  const player = new Player(tracks, options)
  const selector = new Selector(player)
  
  return (
    <div class="container m-auto">
      <p class="text-center text-6xl font-bold mt-44"> BodyBeat </p>
      <div class="m-auto">
        <button class="bg-orange-200 p-2" onClick={() => player.startAll()}>START1</button>
        <button class="bg-orange-200 p-2" onClick={() => selector.init()}>START2</button>
        <button class="bg-orange-200 p-2" onClick={() => selector.process(2)}>ADDENERGY</button>
        <button class="bg-orange-200 p-2" onClick={() => selector.process(0)}>REMOVEENERGY</button>
        {/* <button class="bg-orange-200 p-2" onClick={() => player.startOnBar(tracks[0].filename)}>QUEUE1</button>
        <button class="bg-orange-200 p-2" onClick={() => player.startOnBar(tracks[1].filename)}>QUEUE2</button>
        <button class="bg-orange-200 p-2" onClick={() => player.startAll()}>STARTALL</button>
        <button class="bg-orange-200 p-2" onClick={() => player.stopAll()}>STOPALL</button>
        <button class="bg-orange-200 p-2" onClick={() => player.setParamFunction(tracks[0].filename, 'gain', 0, 4)}>CHANGEGAIN1</button> */} */}
      </div>
    </div>
  );
}

export default App;
