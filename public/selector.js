class Selector {
  constructor(player, library, options) {
    this.ready = false
    this.player = player
    this.library = library
    this.o = this.options2o(options)
    this.transitions = this.createTransitions(options)
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
    const inTransition = this.createTransition(false)
    this.addLoop(track, inTransition)
  }

  decrementEnergyLevel() {
    this.composition.energy--
    const playingTracks = this.composition.tracks[this.composition.energy + 1]
    for (const trackName in playingTracks) {
      const outTransition = this.createTransition(true)
      this.removeLoop(playingTracks[trackName], outTransition)
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

  addLoop(track, transition) {
    this.composition.tracks[track.energy][track.filename] = track
    if (track.filename in this.player.tracks) {
      transition.in(track.filename)
    } else {
      this.player.loadTrack(track)
        .then(() => {
          transition.in(track.filename)
        })
    }
  }

  removeLoop(track, transition) {
    delete this.composition.tracks[track.energy][track.filename]
    transition.out(track.filename)
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

  createTransition(isOut) {
    let func = weighted_random(this.o.TRANSITIONS.in.funcs)
    let duration = weighted_random(this.o.TRANSITIONS.in.durations)
    if (isOut) {
      func = weighted_random(this.o.TRANSITIONS.out.funcs)
      duration = weighted_random(this.o.TRANSITIONS.out.durations)
    }
    return Transition(func, duration, this.player)
  }
}

function weighted_random(options) {
  var i;

  var weights = [];

  for (i = 0; i < options.length; i++)
      weights[i] = options[i].weight + (weights[i - 1] || 0);
  
  var random = Math.random() * weights[weights.length - 1];
  
  for (i = 0; i < weights.length; i++)
      if (weights[i] > random)
          break;
  
  return options[i].item;
}

class Transition {
  constructor(func, duration, player) {
    this.func = func
    this.duration = duration
    this.player = player
  }

  in(trackName) {
    this.player.startOnBar(trackName)
  }

  out(trackName) {
    if (this.func === 'set') {
      this.player.setParamFunction(trackName, 'gain', 0, this.duration, this.func)
      this.player.stopOnBar(trackName, this.duration)
    }
  }
}