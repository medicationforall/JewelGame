function MaxScore(maxScore){
  var endConditionTemplate = 'Target Score:<span class="value">0</span>';
  this.endCondition = $('.endCondition').append(endConditionTemplate);
  this.tmpScore=0;

  /**
   *
   */
  this.setMaxScore=function(maxScore){
    this.maxScore=maxScore;
    this.endCondition.find('.value').text(maxScore);
  };

  /**
   *
   */
  this.maximizeScore=function(score){
    console.log('maximizeScore');
    this.tmpScore+=score;
    if(this.tmpScore>=maxScore){
      this.endGame=true;
    }
  };


  this.setMaxScore(maxScore);
}
