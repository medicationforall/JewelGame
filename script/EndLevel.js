function EndLevel(data){
  this.template='<div class="endLevel screen">'+
    '<h2>Level <span class="endLevel"></span> Complete</h2>'+
    '<div class="content">'+
    'Score: <span class="endScore"></span><br />'+
    'Moves: <span class="endMoves"></span><br />'+
    'Total Points: <span class="totalPoints"></span>'+
    '</div>'+
    '<a href="" class="nextLevelLink">Continue</a>'+
  '</div>';

  this.node = $(this.template);
  this.node.data('node',this);

  /**
   *
   */
  this.setEndLevelData=function(data){
    this.node.find('.endLevel').text(data.level);
    this.node.find('.endLevelName').text(data.levelName);
    this.node.find('.endScore').text(data.score);
    this.node.find('.endMoves').text(data.moves);
    this.node.find('.totalPoints').text((data.score/data.moves));
    //console.log('end level',data);
  };

  /**
   *
   */
  this.node.on('click','.nextLevelLink',$.proxy(function(event){
    event.preventDefault();
    $('.game.screen').data('node').startNextLevel();
    $('.screenControl').data('node').displayScreen('game');
  },this));
}
