function UserGameData(){
  this.startingLevel = 0;
  this.levelHistory = [];


  /**
   * Gather the users cached game data.
   * If it doesn't exist intiates the user cache.
   */
  this.getStoredGameData=function(){
    var userData = store.get('userData');
    if(userData){
      this.startingLevel = userData.currentLevel;
      this.levelHistory = userData.levelHistory;
      $('.levelSelect').data('node').unlockLevelsFromData(this.levelHistory);
      $('.levelSelect').data('node').setStatsFromData(this.levelHistory);
    }else{
      store.set('userData',{
        "currentLevel":this.startingLevel,
        "levelHistory":[]
      });
    }
  };


  /**
   * Set the users stored data.
   */
  this.setStoredGameData=function(data){
    var currentLevel = data.level;
    if(data.win){
      currentLevel++;
    }
    var uData = {};
    uData.currentLevel=currentLevel;
    this.levelHistory.push(data);
    uData.levelHistory=this.levelHistory;

    store.set('userData',uData);
  };
}
