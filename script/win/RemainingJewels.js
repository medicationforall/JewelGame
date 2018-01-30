function RemainingJewels(remainingJewels){
  var endConditionTemplate = 'Remaining Jewels:<span class="value">0</span>';
  this.endCondition = $('.endCondition').append(endConditionTemplate);

  /**
   *
   */
  this.setRemainingJewels=function(remainingJewels){
    this.remainingJewels=remainingJewels;
    this.endCondition.find('.value').text(remainingJewels);
  };

  /**
   *
   */
  this.createdJewel=function(){
    console.log('created Jewel');
    this.decrementRemainingJewels();
  };

  this.decrementRemainingJewels=function(){
    this.remainingJewels--;
    this.setRemainingJewels(this.remainingJewels);
    if(this.remainingJewels==0){
      this.endGame=true;
    }
  };

  this.setRemainingJewels(remainingJewels);
}
