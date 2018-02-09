function ScreenControl(){
  this.node = $('.screenControl');
  this.node.data('node',this);

  $('.header').on('click','.screenLink',$.proxy(function(screenControl,event){
    event.preventDefault();
    var screenName = $(this).data('screen');
    screenControl.displayScreen(screenName);
  },null,this));

  this.displayScreen=function(screenName){
    console.log('display screen',screenName);
    this.node.find('.screen').removeClass('display');
    this.node.find('.'+screenName).addClass('display');
  };

}
