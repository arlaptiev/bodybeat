const MIN_ENERGY = 0
const MAX_ENERGY = 4
const ENERGY_LEVEL_THRESHOLD = {
  0: 1,
  1: 2,
  2: 3,
  3: 4
}

class Selector {
  constructor(player) {
    this.ready = false
    this.player = player
    this.library = {
      tracks: {
        0: [{filename: 'loops/130_Synth_Loop_15_134_SP_dvqp8a.wav'}],
        1: [{filename: 'loops/130_Cm_Melodic_SPFT_126_05_k9f2zx.wav'}],
        2: [],
        3: [],
        4: []
      }
    }
    this.composition = {
      energy: 0,
      tracks: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: []
      }
    }
  }

  init() {
    this.composition.tracks[0].push({filename: '130_Synth_Loop_15_134_SP.wav'})
    this.addLoop(this.composition.tracks[0][0])
    this.ready = true
  }

  calcEnergy(input) {
    return input
  }

  incrementEnergyLevel() {
    this.composition.energy++
    const options = this.library.tracks[this.composition.energy]
    const track = options[Math.floor(Math.random() * options.length)]
    this.composition.tracks[this.composition.energy].push(track)
    this.addLoop(track)
  }

  decrementEnergyLevel() {
    this.composition.energy--
    const playingTracks = this.composition.tracks[this.composition.energy + 1]
    for (let i = playingTracks.length - 1; i >= 0; i -= 1) {
      this.removeLoop(playingTracks[i])
      playingTracks.splice(i, 1);
    }
  }

  process(input) {
    // let updates = []
    // register events
    // maybe add randomness
    let inputEnergy = this.calcEnergy(input)
    if (this.composition.energy < MAX_ENERGY && inputEnergy > ENERGY_LEVEL_THRESHOLD[this.composition.energy]) { 
      this.incrementEnergyLevel()
    }
    if (this.composition.energy > MIN_ENERGY && inputEnergy < ENERGY_LEVEL_THRESHOLD[this.composition.energy - 1]) { 
      this.decrementEnergyLevel()
    }
    // process continuous input
  }

  addLoop(track) {
    if (track.filename in this.player.tracks) {
      this.player.startOnBar(track.filename)
    } else {
      this.player.loadTrack(track)
        .then(() => {
          this.player.startOnBar(track.filename)
        })
    }
  }

  removeLoop(track) {
    this.player.stopOnBar(track.filename)
  }
}

export default Selector
