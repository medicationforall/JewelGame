function UserLevels(){
  this.levels=[];


  /**
   *
   */
  this.addUserLevel=function(level){
    this.levels.push(level);
    this.storeUserLevels();
  };


  /**
   *
   */
  this.storeUserLevels=function(){
    store.set('userLevels',this.levels);
  };


  /**
   *
   */
  this.getUserLevels=function(){
    var tmpLevels = store.get('userLevels');

    if(tmpLevels){
      this.levels = tmpLevels;
    }

    return this.levels;
  };


}
