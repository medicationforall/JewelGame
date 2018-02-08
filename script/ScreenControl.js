function ScreenControl(){
  this.node = $('.screenControl');
  this.node.data('node',this);
  
  this.displayScreen=function(screenName){
    
    this.node.find('.screen').removeClass('display');
    this.node.find(screenName).addClass('display');
  }
  
}