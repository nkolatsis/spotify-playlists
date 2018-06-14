import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff',
};

let fakeServerData = {
  user: {
    name: "Nicholas",
    playlists: [
      {
        name: 'My favourites',
        songs: [
          {name: 'Beat It', duration: 1345},
          {name: 'Cannelloni Makaroni', duration: 1345},
          {name: 'Rosa helikopter', duration: 1345}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Le song', duration: 1345},
          {name: 'Despacito', duration: 1345},
          {name: 'Bleu',duration: 1345}
        ]
      },
      {
        name: 'Worakls',
        songs: [
          {name: 'Trauma', duration: 1345},
          {name: 'Bleu', duration: 1345},
          {name: 'Toi', duration: 1345}
        ]
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          {name: 'Death to Ragnarok', duration: 1345},
          {name: 'Johnny boy', duration: 1345},
          {name: 'The dawn of prayge', duration: 1345}
        ]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    )
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0)
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/3600)} hours</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={{...defaultStyle}}>
        <img/>
        <input type="text" />
        Filter
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: "inline-block", width: "25%"}}> 
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    )
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);

  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, "font-size": "54px"}}>
            {this.state.serverData.user && 
              this.state.serverData.user.names}'s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter/>
          {this.state.serverData.user.playlists.map(playlist => 
          <Playlist playlist={playlist} />
          )}
        </div> : <h1 style={{...defaultStyle}}>Loading...</h1>
        }
          
      </div>
    );
  }
}

export default App;
