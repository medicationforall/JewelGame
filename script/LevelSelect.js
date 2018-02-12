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
    '<div class="levelLock">'+
    '<svg class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><path d="M0 0h512v512H0z" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M254.28 17.313c-81.048 0-146.624 65.484-146.624 146.406V236h49.594v-69.094c0-53.658 43.47-97.187 97.03-97.187 53.563 0 97.032 44.744 97.032 97.186V236h49.594v-72.28c0-78.856-65.717-146.407-146.625-146.407zM85.157 254.688c-14.61 22.827-22.844 49.148-22.844 76.78 0 88.358 84.97 161.5 191.97 161.5 106.998 0 191.968-73.142 191.968-161.5 0-27.635-8.26-53.95-22.875-76.78H85.155zM254 278.625c22.34 0 40.875 17.94 40.875 40.28 0 16.756-10.6 31.23-25.125 37.376l32.72 98.126h-96.376l32.125-98.125c-14.526-6.145-24.532-20.62-24.532-37.374 0-22.338 17.972-40.28 40.312-40.28z" fill-opacity="1"></path></g></svg>'+
    '</div>'+
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
