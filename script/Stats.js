function Stats(){
  //this.template='<div class="stats screen"><h2>Player Stats</h2></div>';
  //this.node=$(this.template);
  //this.node.data('node',this);
  this.lvData = [];


  /**
   *
   */
  this.setStatsFromData=function(levelHistory){
    //console.log('set level stats',levelHistory);

    for(var i=0,level;(level=levelHistory[i]);i++){
      this.resolveStats(level);
    }
  };


  /**
   *
   */
  this.resolveStats=function(level){
    if(this.lvData[level.level]===undefined){
      this.addStats(level);
    }else{
      this.appendStats(level);
    }
  };


  /**
   *
   */
  this.addStats=function(data){
    var tData = Object.assign({}, data);
    tData.plays=1;
    this.lvData[data.level] = tData;

    this.addStatsNode(tData);
  };


  /**
   *
   */
  this.addStatsNode=function(data){
    var template = '<div class="levelStat" data-level="'+data.level+'">'+
    '<span class="plays">Played '+data.plays+' '+(data.plays>1?'times':'time')+'</span><br /><br />'+
    'Best:<br />'+
    'Score: <span class="statScore">'+data.score+'</span><br />'+
    'Moves: <span class="statMoves">'+data.moves+'</span><br />'+
    '</div>';
    this.node.find('.levelSelection[data-level="'+data.level+'"]').append(template);
  };


  /**
   *
   */
  this.appendStats=function(data){
    var tData = Object.assign({}, data);
    tData.plays = this.lvData[data.level].plays+1;
    var rating = tData.score/tData.moves;
    //cached rating
    var cRating = this.lvData[data.level].score/this.lvData[data.level].moves;

    if(rating > cRating){
      this.lvData[data.level] = tData;
    }else{
      this.lvData[data.level].plays++;
    }

    this.updateStatsNode(this.lvData[data.level]);
  };


  /**
   *
   */
  this.updateStatsNode=function(data){
    this.node.find('.levelStat[data-level="'+data.level+'"] .plays').text('Played '+data.plays+' '+(data.plays>1?'times':'time'));
    this.node.find('.levelStat[data-level="'+data.level+'"] .statScore').text(data.score);
    this.node.find('.levelStat[data-level="'+data.level+'"] .statMoves').text(data.moves);
  };
}
