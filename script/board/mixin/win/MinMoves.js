function MinMoves(minMoves){
  var endConditionTemplate = 'Minimum Moves:<span class="value">0</span>';
  this.endCondition = $('.endCondition').append(endConditionTemplate);
  this.tmpMoves=0;
  this.minMoves=0;


  /**
   * Set remaining moves.
   * @param {int} remainingMoves
   */
  this.setMinMoves=function(minMoves){
    this.minMoves=minMoves;
    this.endCondition.find('.value').text(minMoves);
  };


  /**
   * Called when a move is played.
   */
  this.playedMove=function(){
    this.incrementMinMoves();
  };


  /**
   * Decrement remaining moves by one.
   */
  this.incrementMinMoves=function(){
    this.tmpMoves++;
  };

  /**
   * Has the win condition been satisfied?
   * @return {boolean}
   */
  this.isWin=function(){
    if(this.tmpMoves>=this.minMoves){
      return true;
    }else{
      return false;
    }
  };

  this.setMinMoves(minMoves);
}
