function HasMoveTokens(){
  /**
   *
   */
  this.node.on('click','.space',$.proxy(function(board,event){
    if(board.canInteract){
      var space = $(this).data('node');
      space.selectToken();

      var selectedSpaces = board.node.find('.space.selected');
      if(selectedSpaces.length>1){
        board.moveTokens(selectedSpaces);
      }
    }else{
      console.log('can\'t interact');
    }
  },null,this));


  /**
   *
   */
  this.moveTokens=function(spaces){
    var sp1 = $(spaces[0]).data('node');
    var sp2 = $(spaces[1]).data('node');

    if(this._isTouching(sp1,sp2)){
      this.swapTokens('moveTokens');
    }else{
      this.unselectTokens();
    }

    this.increaseMoves();
  };


  /**
   *
   */
  this.increaseMoves=function(){
    var eMoves = parseInt($('.moves .value').text());
    var newMoves = eMoves+1;
    $('.moves .value').text(newMoves);
    this.playedMove();
  };
  
  
  /**
   *
   */
  this.playedMove=function(){};


  /**
   *
   */
  this._isTouching=function(sp1,sp2){
    var i1 = sp1.getIndex();
    var i2 = sp2.getIndex();

    var xAxisCheck = i1-i2;
    var topCheck = i1 - properties.width;
    var bottomCheck = i1 + properties.width;

    if(xAxisCheck === -1 || xAxisCheck === 1){
      return true;
    }else if(topCheck === i2){
      return true;
    }else if(bottomCheck === i2){
      return true;
    }

    return false;
  };


  /**
   *
   */
  this.swapTokens=function(source){
    var selectedSpaces = this.node.find('.space.selected');
    if(selectedSpaces.length>1){
      var sp1 = $(selectedSpaces[0]).data('node');
      var sp2 = $(selectedSpaces[1]).data('node');

      data1 = sp1.getData();
      data2 = sp2.getData();

      sp1.setData(data2);
      sp2.setData(data1);

      if(source=='moveTokens'){
        $.when(sleep(sleepTime+200)).then($.proxy(function() {
          this.checkCombos('swap');
        },this));
      }
    }
  };


  /**
   *
   */
  this.unselectTokens=function(){
    var selectedSpaces = this.node.find('.space.selected');

    for(var i=0,space;(space=selectedSpaces[i]);i++){
      node = $(space).data('node');
      node.unselectToken();
    }
  };
}