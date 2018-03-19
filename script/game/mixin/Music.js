/**
 *   Jewel Game source file Music,
 *   Copyright (C) 2018  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Manages music playback and applies user options in regards to volume and mute.
 * @mixin
 */
function Music(){
  musicDataFile = 'music.json';
  this.songList=[];
  this.songCache={};
  this.song=undefined;
  this.musicEnabled=true;
  this.musicVolume=100;

  /**
   * Retreive the list of available songs.
   */
  $.getJSON('json/'+musicDataFile).done($.proxy(function(data){
    this.songList = data.songs;
  },this));


  /**
   * Play a song for a particular level.
   * @param {int} lvNo Level Number.
   */
  this.startMusic=function(lvNo){
    if(this.song){
      this.song.stop();
    }

    if(this.songList.length>0){
      var songName = this.resolveSongName(lvNo);
      this.song = this.resolveSongFile(songName);
      if(this.musicEnabled){
        this.song.play();
        this.song.volume(this.musicVolume/100);
      }
    }
  };


  /**
   * From the given lvlNo get that levels data and determine which song to play.
   * @param {int} lvlNo Level Number.
   */
  this.resolveSongName=function(lvlNo){
    var songName = "";
    var levelData = this.levelSet.levels[lvlNo];
    if(levelData.song){
      console.log('play Specific song');
      songName = levelData.song;
    }else{
      var rng = $('.board').data('node').rng;
      if(levelData.seed!==undefined){
        songName = this.songList[rng.getRandom(this.seed+levelData.seed+'-song',0,this.songList.length-1)].file;
      }else{
        songName = this.songList[rng.getTrueRandom(0,this.songList.length-1)].file;
      }
    }
    return songName;
  };


  /**
   * From the given songName add it or retrieve it from the songCache.
   * @return {Howl} The song in a playable object.
   */
  this.resolveSongFile=function(songName){
    console.log('get this song'+songName);
    var song;
    if(this.songCache[songName]!==undefined){
      console.log('get song from cache');
      song = this.songCache[songName];
    }else{
      console.log('new howler song');
      song = new Howl({src: ['sound/music/'+songName], loop: true});
      this.songCache[songName]=song;
    }
    return song;
  };


  /**
   * Set if music is enabled.
   * @param {boolean} value
   */
  this.setMusicEnabled=function(value){
    console.log('setting music enabled for game');
    if(this.song){
      if(value){
        this.song.play();
        this.song.volume(this.musicVolume/100);
      }else{
        this.song.pause();
      }
    }
    this.musicEnabled=value;
  };


  /**
   * Set music volume.
   * @param {int} value 0-100
   */
  this.setMusicVolume=function(value){
    this.musicVolume=value;

    if(this.song){
      if(value){
        this.song.volume(this.musicVolume/100);
      }
    }
  };
}
