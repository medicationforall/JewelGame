function HamburgerMenu(){
  this.node = $('.hamburgerMenu');
  this.node.data('node',this);


  /**
   *
   */
  this.node.on('click','.screenLink',$.proxy(function(hamburgerMenu,event){
    event.preventDefault();
    var screenName = $(this).data('screen');
    var screenControl = $('.screenControl').data('node');
    screenControl.displayScreen(screenName);
    hamburgerMenu.toggleHamburger();
  },null,this));


  /**
   *
   */
  this.node.on('click','.closeHamburger',$.proxy(function(hamburgerMenu,event){
    event.preventDefault();
    hamburgerMenu.toggleHamburger();
  },null,this));


  /**
   *
   */
  this.toggleHamburger=function(){
    if(this.node.hasClass('display')===false){
      this.node.addClass('display');
    }else{
      this.node.removeClass('display');
    }
  };
}
