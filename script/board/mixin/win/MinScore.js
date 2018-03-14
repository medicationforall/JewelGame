function MinScore(minScore){
  var endConditionTemplate = 'Minimum Score:<span class="value">0</span>';
  this.endCondition = $('.'+this.screen+'.menuScreen .endCondition').append(endConditionTemplate);
  this.tmpScore=0;
  this.minScore=0;

  /**
   * Set max score.
   * @param {int} maxScore
   */
  this.setMinScore=function(minScore){
    this.minScore=minScore;
    this.endCondition.find('.value').text(minScore);
  };

  /**
   * Called when score is increased.
   * @param {int} score Amount to increase by.
   */
  this.maximizeScore=function(score){
    this.tmpScore+=score;
  };

  /**
   * Has the win condition been satisfied?
   * @return {boolean}
   */
  this.isWin=function(){
    if(this.tmpScore>=this.minScore){
      return true;
    }else{
      return false;
    }
  };

  this.setMinScore(minScore);
}
