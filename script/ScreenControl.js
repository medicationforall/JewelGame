function ScreenControl(){
  this.node = $('.screenControl');
  this.node.data('node',this);

  /**
   *
   */
  this.displayScreen=function(screenName){
    //console.log('display screen',screenName);
    this.node.find('.screen').removeClass('display');
    this.node.find('.'+screenName).addClass('display');
    $('.header').data('node').displayMenu(screenName);
  };


  /**
   *
   */
  this.add=function(classObject){
    var screen = new classObject();
    this.node.append(screen.node);
  };
}
