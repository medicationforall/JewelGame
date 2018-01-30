function RemainingMoves(remainingMoves){
  var endConditionTemplate = 'Remaining Moves:<span class="value">0</span>';
  this.endCondition = $('.endCondition').append(endConditionTemplate);

  /**
   *
   */
  this.setRemainingMoves=function(remainingMoves){
    this.remainingMoves=remainingMoves;
    this.endCondition.find('.value').text(remainingMoves);
  };

  /**
   *
   */
  this.playedMove=function(){
    console.log('created Jewel');
    this.decrementRemainingMoves();
  };

  this.decrementRemainingMoves=function(){
    this.remainingMoves--;
    this.setRemainingMoves(this.remainingMoves);
    if(this.remainingMoves==0){
      this.endGame=true;
    }
  };

  this.setRemainingMoves(remainingMoves);
}
