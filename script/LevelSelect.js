function LevelSelect(){
  this.node=$('.levelSelect');
  this.node.data('node',this);
  this.levels = null;


  /**
   *
   */
  this.setLevelSet=function(levelSet){
    this.levels = levelSet.levels;
    for(var i=0,level;(level = levelSet.levels[i]);i++){
      this.addLevel(i,level);
    }
  };


  /**
   *
   */
  this.addLevel=function(index,level){
    var template = '<div class="levelSelection" data-level="'+index+'">'+
    '<a href="" class="selectLevel" data-level="'+index+'">'+
    'Lv <span class="number">'+(index+1)+'</span>: '+
    '<span class="name">'+level.name+'</span>'+
    '</a>'+
    '</div>';
    this.node.append(template);
  };


  /**
   * @todo check if level passed.
   */
  this.node.on('click','.selectLevel',$.proxy(function(levelSelect,event){
    event.preventDefault();
    console.log('clicked level');
    var levelNumber = parseInt($(this).data('level'));
    $('.game').data('node').startLevel(levelNumber);
    $('.screenControl').data('node').displayScreen('game');
  },null,this));
}
