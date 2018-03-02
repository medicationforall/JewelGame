function UserOptions(){
  this.options=undefined;

  /**
   *
   */
  this.getStoredOptions=function(){
    this.options = store.get('options');
    if(this.options){
      this.setOptions(this.options);
      $('.options.screen').data('node').setOptionsFromData(this.options);
    }else{
      this.options = {"playSpeed":2.0,"musicEnabled":true,"musicVolume":100};
      store.set('options',this.options);
    }
    //console.log('get stored options',this.options);
  };


  /**
   * Set options.
   * @param {object} tmpOptions Option data.
   */
  this.setOptions=function(tmpOptions){
    this.options=tmpOptions;
    store.set('options',this.options);
    if(this.board){
      this.board.setPlaySpeed(this.options.playSpeed);
    }

    this.setMusicEnabled(this.options.musicEnabled);
    this.setMusicVolume(this.options.musicVolume);
  };
}
