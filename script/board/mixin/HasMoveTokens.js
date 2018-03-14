/**
 *   Jewel Game source file HasMoveToken,
 *   Copyright (C) 2018  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function HasMoveTokens(properties){

  this.moveSound = new Howl({
    src: ['sound/move.wav']
  });

  this.selectSound = new Howl({
    src: ['sound/select.wav']
  });

  this.deSelectSound = new Howl({
    src: ['sound/deSelect.wav']
  });

  this.cancelSelectSound = new Howl({
    src: ['sound/cancelSelect.wav']
  });


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
      }else if(selectedSpaces.length===1){
        board.selectSound.play();
      }else if(selectedSpaces.length===0){
        board.deSelectSound.play();
      }
    }else{
      console.log('can\'t interact with the board.');
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
      this.moveSound.play();
      this.selectSound.play();
    }else{
      this.unselectTokens();
      success = false;
      this.cancelSelectSound.play();
    }
    this.increaseMoves();
  };


  /**
   *
   */
  this.increaseMoves=function(){
    var eMoves = this.moves;
    var newMoves = eMoves+1;
    $('.'+this.screen+'.menuScreen .moves .value').text(newMoves);

    if(this.tipType==='move'){
      this.showTip({"move":newMoves});
    }
    this.moves++;
    this.playedMove();
    this.checkLevelBlocks();
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

    if(sp1.color==='warp' || sp2.color==='warp'){
      return true;
    } else if(xAxisCheck === -1 || xAxisCheck === 1){
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
        $.when(this.sleep(this.sleepTime+200)).then($.proxy(function() {
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


  /**
   *
   */
  this.unhighlightTokens=function(){
    var selectedSpaces = this.node.find('.space.highlighted');

    for(var i=0,space;(space=selectedSpaces[i]);i++){
      node = $(space).data('node');
      node.unhighlightToken();
    }
  };
}
