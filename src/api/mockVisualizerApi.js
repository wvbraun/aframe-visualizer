const delay = 1000;

const tracks = [
  {
    src: 'http://localhost:3000/audio/Rejoice.wav',
    title: 'Rejoice',
    artist: 'Julien Baker',
    album: 'Sprained Ankled',
  },
  {
    src: 'http://localhost:3000/audio/Paris.mp3',
    title: 'PARIS',
    artist: 'LE SINNER',
    album: '',
  },
];

class VisualizerApi {
  static getAllTracks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], tracks));
      }, delay);
    });
  }

  static addTrack(track) {
    track = Object.assign({}, track);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        tracks.push(track);
        resolve(track);
      }, delay);
    });
  }

  static spotifyLogin () {
    const settings = {
      method: 'GET',
    };
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3001/login', settings)
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          throw(err);
        });
    });
  }
}

export default VisualizerApi;
