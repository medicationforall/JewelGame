function Header(){
  this.node = $('.header');
  this.node.data('node',this);

  /**
   *
   */
  this.displayMenu=function(menuName){
    this.node.find('.menuScreen').removeClass('display');
    this.node.find('.'+menuName).addClass('display');
  };

  /**
   *
   */
  this.node.on('click','.hamburger',$.proxy(function(event){
    event.preventDefault();
    $('.hamburgerMenu').data('node').toggleHamburger();
  }));
}
