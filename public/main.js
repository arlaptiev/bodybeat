// options
const playerOptions = {bpm: 130, libraryUrl: '/audio/'}
const selectorOptions = {
  ENERGY_LEVEL_THRESHOLD: { 0: 2, 1: 3, 2: 4 },
  MAX_ENERGY: 3,
  TRANSITIONS: {
    out: {
      funcs: [
        {item: 'set', weight: 6},
        {item: 'linear', weight: 2},
      ],
      durations: [
        {item: 1, weight: 6},
        {item: 2, weight: 2},
        {item: 3, weight: 2}
      ]
    },
    in: {
      funcs: [
        {item: 'set', weight: 8},
        {item: 'linear', weight: 1},
      ],
      durations: [
        {item: 1, weight: 1},
        {item: 2, weight: 1},
        {item: 3, weight: 1}
      ]
    }
  }
}

function processLib(library) {
  let tracks = {}

  for (let level = 0; level <= selectorOptions.MAX_ENERGY; level++) {
    tracks[level] = [];
    for (let track of library['tracks'][level]) {
      tracks[level].push({'filename': track, 'energy': level});
    }
  }
  return {'tracks': tracks};
}


const library = processLib({
  tracks: {
    0: [
      'looperman-l-0000003-0000058-serialchiller-chilla-acid-de-la-playa-bass.wav',
      'looperman-l-0000003-0000085-serialchiller-chilla-dream-pad-1.wav',
      'looperman-l-0000003-0000086-serialchiller-chilla-dream-pad-2.wav',
    ],
    1: [
      'looperman-l-0000003-0000059-serialchiller-chilla-acid-de-la-playa-guitar-1.wav',
      'looperman-l-0000003-0000061-serialchiller-chilla-acid-de-la-playa-guitar-3.wav',
      'looperman-l-0000003-0000062-serialchiller-chilla-acid-de-la-playa-phazz-fx-2.wav',
      'looperman-l-0000003-0000063-serialchiller-chilla-fat-bass.wav',
      'looperman-l-0000003-0000064-serialchiller-chilla-funky-bass.wav',
      'looperman-l-0000003-0000079-serialchiller-chilla-funky-guitar-am-1.wav',
      'looperman-l-0000003-0000089-serialchiller-chilla-synth-pulse-1.wav',
      'looperman-l-0000003-0000093-serialchiller-chilla-synth-riff-3.wav',
      'looperman-l-0000003-0000094-serialchiller-chilla-synth-skank-riff.wav',
    ],
    2: [
      'looperman-l-0000003-0000057-serialchiller-chilla-acid-de-la-playa-arp.wav',
      'looperman-l-0000003-0000065-serialchiller-chilla-pulse-bass.wav',
      'looperman-l-0000003-0000090-serialchiller-chilla-synth-pulse-2.wav',
    ],
    3: [
      'looperman-l-0000003-0000077-serialchiller-chilla-stutter-fx-1.wav',
      'looperman-l-0000003-0000078-serialchiller-chilla-stutter-fx-2.wav',
    ],
  }
})

const library2 = processLib({
  tracks: {
    0: [
      'looperman-l-0000014-0000117-bentleyrhythmace-bra-punch-bass.wav'
    ],
    1: [
       'looperman-l-0303420-0021825-snloops-s-n-2step-of-looperman-piano-riff.wav',
       'looperman-l-0000014-0000107-bentleyrhythmace-bra-pitch-synth-loop',
       'looperman-l-0244049-0023904-antyon-simple-techno-drum-loop',
       'looperman-l-0303420-0021817-snloops-s-n-2stepmx-of-looperman-dr-loop2'
    ],
    2: [
       'looperman-l-0002663-0049425-djfredval-fv-bass-line13-130.wav',
       'looperman-l-1319133-0128084-fanto8bc-techno-kick.wav',
       'looperman-l-2612885-0229522-basic-techno-drum-loop.wav',
       'looperman-l-0063133-0007723-rogueai-hypnotic-subsonic-130.wav',
       'looperman-l-0082073-0004394-mrrobot-hell-gate-tb-303.wav',
       'looperman-l-0141892-0006249-evolutionmix-techno-cowbels-drum-plus-drum.wav'
    ],
    3: [
       'looperman-l-0158495-0051179-edge7-slither-8.wav',
       'looperman-l-1319133-0095203-fanto8bc-i-found-the-snare.wav',
       'looperman-l-2830941-0203999-pop-techno-style-ii-by-kidlas.wav',
    ],
  }
})

let library = library1
if (Math.random() > 0.3) { library = library2 }
const initTracks = [library.tracks[0][0]]

// init sound module
const player = new Player(playerOptions)
const selector = new Selector(player, library, selectorOptions)

function initSound() {
  player.startAll()
  selector.init(initTracks)
}

function camera2selector(input) {
  console.log('energy', input)
  if (selector.ready) {
    selector.process(input)
  }
}

// init camera module
var Module = {
  // https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
  onRuntimeInitialized() {
    document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
    console.log('Runtime initialised')
    var mat = new cv.Mat()
    run_camera_flow(camera2selector)
  }
};