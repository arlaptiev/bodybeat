// options
const playerOptions = {bpm: 130, libraryUrl: '/audio/'}
const selectorOptions = {
  MIN_ENERGY: 0,
  MAX_ENERGY: 3,
  ENERGY_LEVEL_THRESHOLD: {0: 2, 1: 3, 2: 4}
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
      'looperman-l-0303420-0021825-snloops-s-n-2step-of-looperman-piano-riff.wav',
    ],
    2: [
      'looperman-l-0000003-0000057-serialchiller-chilla-acid-de-la-playa-arp.wav',
      'looperman-l-0000003-0000065-serialchiller-chilla-pulse-bass.wav',
      'looperman-l-0000003-0000090-serialchiller-chilla-synth-pulse-2.wav',
      'looperman-l-0000014-0000117-bentleyrhythmace-bra-punch-bass.wav',
      'looperman-l-0002663-0049425-djfredval-fv-bass-line13-130.wav',
      'looperman-l-1319133-0128084-fanto8bc-techno-kick.wav',
      'looperman-l-2612885-0229522-basic-techno-drum-loop.wav',
    ],
    3: [
      'looperman-l-0000003-0000077-serialchiller-chilla-stutter-fx-1.wav',
      'looperman-l-0000003-0000078-serialchiller-chilla-stutter-fx-2.wav',
      'looperman-l-0158495-0051179-edge7-slither-8.wav',
      'looperman-l-1319133-0095203-fanto8bc-i-found-the-snare.wav',
      'looperman-l-2830941-0203999-pop-techno-style-ii-by-kidlas.wav',
    ],
  }
})

const initTracks = [library.tracks[0][0]]
console.log(library)
console.log(processLib(library))

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