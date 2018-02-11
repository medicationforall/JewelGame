function LevelSelect(){
  this.template='<div class="levelSelect screen"></div>';
  this.node=$(this.template);
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
    var template = '<div class="levelSelection locked" data-level="'+index+'">'+
    '<a href="" class="selectLevel" data-level="'+index+'">'+
    'Lv <span class="number">'+(index)+'</span>: '+
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
    if($(this).parent().hasClass('locked')===false){
      console.log('clicked level');
      var levelNumber = parseInt($(this).data('level'));
      $('.game.screen').data('node').startLevel(levelNumber);
      $('.screenControl').data('node').displayScreen('game');
    }
  },null,this));


  /**
   *
   */
  this.unlockLevel=function(lv){
    this.node.find('.levelSelection[data-level="'+lv+'"]').removeClass('locked');
  };
}
