class Selector {
  constructor(player, library, options) {
    this.ready = false
    this.player = player
    this.library = library
    this.o = this.options2o(options)
    this.composition = {
      energy: 0,
      tracks: this.options2tracks(options) // object with energy levels as keys and an object of track objects as a value
    }
  }

  init(initTracks) {
    /* initTracks = 0 energy tracks
    */
    if (this.ready === false) {
      for (const trackName in initTracks) {
        this.addLoop(initTracks[trackName])
      }
      this.ready = true
      console.log('initted selector')
    }
  }

  calcEnergy(input) {
    return input
  }

  incrementEnergyLevel() {
    this.composition.energy++
    const options = this.library.tracks[this.composition.energy]
    const track = options[Math.floor(Math.random() * options.length)]
    this.addLoop(track)
  }

  decrementEnergyLevel() {
    this.composition.energy--
    const playingTracks = this.composition.tracks[this.composition.energy + 1]
    for (const trackName in playingTracks) {
      this.removeLoop(playingTracks[trackName])
    }
  }

  process(input) {
    // let updates = []
    // register events
    // maybe add randomness
    let inputEnergy = this.calcEnergy(input)
    if (this.composition.energy < this.o.MAX_ENERGY && inputEnergy > this.o.ENERGY_LEVEL_THRESHOLD[this.composition.energy]) { 
      this.incrementEnergyLevel()
    }
    if (this.composition.energy > 0 && inputEnergy < this.o.ENERGY_LEVEL_THRESHOLD[this.composition.energy - 1]) { 
      this.decrementEnergyLevel()
    }
    // process continuous input
  }

  addLoop(track) {
    this.composition.tracks[track.energy][track.filename] = track
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
    if (track.filename in this.player.tracks) {
      delete this.composition.tracks[track.energy][track.filename]
      this.player.stopOnBar(track.filename)
    } else {
      this.composition.energy += 1
    }
  }

  /* HELPERS 
  */
  options2o(options) {
    options.MAX_ENERGY = Math.max(...Object.keys(options.ENERGY_LEVEL_THRESHOLD).map(Number)) + 1
    options.MIN_ENERGY = 0
    return options
  }
  options2tracks(options) {
    let tracks = {}
    for (let i = 0; i < this.o.MAX_ENERGY + 1; i++) {
      tracks[i] = {}
    }
    return tracks
  }
}
