function Music(){
  musicDataFile = 'music.json';
  this.songList=[];
  this.songCache={};
  this.song=undefined;

  /**
   *
   */
  $.getJSON('json/'+musicDataFile).done($.proxy(function(data){
    this.songList = data.songs;
  },this));


  /**
   *
   */
  this.startMusic=function(lvNo){
    if(this.song){
      this.song.stop();
    }

    if(this.songList.length>0){

      var songName = this.resolveSongName(lvNo);
      this.song = this.resolveSongFile(songName);

      this.song.play();
    }
  };

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
}
