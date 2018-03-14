function MinJewels(minJewels){
  var endConditionTemplate = 'Minimum Jewels:<span class="value">0</span>';
  this.endCondition = $('.'+this.screen+'.menuScreen .endCondition').append(endConditionTemplate);
  this.tmpJewels=0;
  this.minJewels=0;


  /**
   * Set remaining jewels.
   * @param {int} remainingJewels
   */
  this.setMinJewels=function(minJewels){
    this.minJewels=minJewels;
    this.endCondition.find('.value').text(minJewels);
  };


  /**
   * Called when a jewel is created.
   */
  this.createdJewel=function(){
    this.incrementMinJewels();
  };


  /**
   * Increment jewels counter by one.
   */
  this.incrementMinJewels=function(){
    this.tmpJewels++;
  };


  /**
   * Has the win condition been satisfied?
   * @return {boolean}
   */
  this.isWin=function(){
    if(this.tmpJewels>=this.minJewels){
      return true;
    }else{
      return false;
    }
  };

  this.setMinJewels(minJewels);
}
