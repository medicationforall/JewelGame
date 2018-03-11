/**
 *   Jewel Game source file Board,
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

/**
 * Board - Represents a game level.
 * @param  {string} seed String used for the pseudo-random RNG creation.
 * @param  {int} level Level number.
 * @param  {Object} properties Level description object.
 * @returns {Board}
 */
function Board(seed,level,properties,options){
  var template='<div class="board"></div>';
  this.node= $(template);
  this.node.data('node',this);

  this.seed= seed;
  this.rng=new Rng(this.seed);
  this.startBlockIndex = 0;
  this.tipType='score';
  this.tipIndex=0;

  this.shapes=['square','circle','triangle','pentagon','rabbet','star'];
  this.colors=['red','blue','green','orange','purple', 'yellow','stone','ice','fire','rainbow'];

  this.sleepTime = 250;
  this.playSpeed=2;

  this.endSound = new Howl({
    src: ['sound/levelComplete.wav']
  });

  /*Mixin*/
  HasCombos.call(this,properties);
  HasMoveTokens.call(this,properties);


  /**
   * @constructor
   */
  this._constructor=function(){
    this.setLevel(level);

    this.setEndCondition(properties.endCondition);
    this.setColors(properties.colors);
    this.setShapes(properties.shapes);
    this.setTipType(properties.tipType);

    this.setPlaySpeed(options.playSpeed);

    this._buildBoardSpaces();
    this.showTip({"score":0,"move":0});
    this.checkCombos('initial');
  };


  /**
   * Sets the level number for the current level.
   * @param {int} level
   */
  this.setLevel=function(level){
    $('.level .value').text(level);
  };


  /**
   * Sets the Board's end condition.
   * @param {Object} endCondition
   */
  this.setEndCondition=function(endCondition){
    if(endCondition.remainingJewels){
      RemainingJewels.call(this,endCondition.remainingJewels);
    } else if(endCondition.remainingMoves){
      RemainingMoves.call(this,endCondition.remainingMoves);
    } else if(endCondition.maxScore){
      MaxScore.call(this,endCondition.maxScore);
    } else if(endCondition.minScore){
      MinScore.call(this,endCondition.minScore);
    } else if(endCondition.minMoves){
      MinMoves.call(this,endCondition.minMoves);
    } else if(endCondition.minJewels){
      MinJewels.call(this,endCondition.minJewels);
    } else{
      console.warn('unknown end condition');
    }
  };


  /**
   * Sets the colors that this Board supports.
   * @param {Array} colors
   */
  this.setColors=function(colors){
    if(colors){
        this.colors = colors;
    }
  };


  /**
   * Sets the shapes that this Board supports.
   * @param {Array} shapes
   */
  this.setShapes=function(shapes){
    if(shapes){
        this.shapes = shapes;
    }
  };


  /**
   * Fills the board with Spaces.
   * @private
   */
  this._buildBoardSpaces=function(){
    var count = properties.width * properties.height;

    for(var i=0;i<count;i++){
      var color="red";
      var shape="square";

      var space = this._buildBoardSpace(i);
      this.node.append(space.node);

      if((i+1)%properties.width===0){
        this.node.append('<br />');
      }
    }
  };


  /**
   * Creates a Space to place onto the Board instance.
   * @private
   * @param  {int} index position of the space on the board.
   * @returns {Space} The created Space Object.
   */
  this._buildBoardSpace=function(index){
    var space = null;
    if(properties.startBlocks && properties.startBlocks[index]){
      var data = properties.startBlocks[index];
      space = new Space(data.color,data.shape,index);
      this.startBlockIndex++;
    }else{
      space = new Space(this._getRandomColor(),this._getRandomShape(),index);
    }
    return space;
  };


  /**
   * @param  {Object} prop locally passed properties to determine if the tip should be shown.
   */
  this.showTip=function(prop){
    if(properties.tips){
      if(properties.tips[this.tipIndex] && properties.tips[this.tipIndex].enabled != false){
        var message = properties.tips[this.tipIndex].message;
        var score = properties.tips[this.tipIndex].score;
        var move = properties.tips[this.tipIndex].move;
        var color = properties.tips[this.tipIndex].color;
        var highlight = properties.tips[this.tipIndex].highlight;

        if(color===undefined){
          color='';
        }

        $('.tip').removeClass('red orange yellow green blue purple rainbow stone');
        this.unhighlightTokens();

        if((prop && score !==undefined && prop.score === score) || (prop && move !==undefined && prop.move === move)){
          if(highlight !== undefined && highlight.length>0){
            this.highlightSpaces(highlight);
          }
          $('.tip').addClass('display '+color).html(message).animateCss('vanishIn');
          this.tipIndex++;
        }else{
          $('.tip').removeClass('display');
        }
      }else{
        $('.tip').removeClass('display');
      }
    }
  };


  /**
   * Highlight spaces from array
   * @param {array} highlight array space indexes to highlight.
   */
  this.highlightSpaces=function(highlight){
      for(var i=0,spaceIndex;i<highlight.length;i++){
        var space = this.node.find('.space[data-index="'+highlight[i]+'"]').data('node');
        space.highlightToken();
      }
  };


  /**
   * @param {int} ms Time in milliseconds to make the main execution thread sleep.
   * @returns {Promise} The promise from the sleep operation.
   */
  this.sleep=function(ms) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, (ms/this.playSpeed), 'foo');
    }.bind(this));
  };


  /**
   * @private
   * @returns {string}  Resolves a random color driven by seed.
   */
  this._getRandomColor=function(){
    return this._getRandom(this.colors,'color');
  };


  /**
   * @private
   * @returns {string}  Resolves a random shape driven by seed.
   */
  this._getRandomShape=function(){
    return this._getRandom(this.shapes,'shape');
  };


  /**
   *
   */
  this._getRandom=function(lookup,modifier){
    if(properties.seed){
      return lookup[this.rng.getRandom(this.seed+properties.seed+'-'+modifier,0,lookup.length-1)];
    } else{
      return lookup[this.rng.getTrueRandom(0,lookup.length-1)];
    }
  };


  /**
   * @returns {Object}  The end of stage summary data.
   */
  this.getEndGameData=function(){
    var data = {};
    data.level = level;
    data.levelName = properties.name;
    data.score = parseInt($('.score .value').text());
    data.moves = parseInt($('.moves .value').text());
    data.jewelsCleared = this.jewelsCleared;
    data.win = this.isWin();
    return data;
  };

  /**
   *
   */
  this.isWin=function(){
    return false;
  };


  /**
   *
   */
  this.setPlaySpeed=function(playSpeed){
    this.playSpeed=parseFloat(playSpeed).toFixed(1);
  };


  /**
   *
   */
  this.setTipType=function(tipType){
    if(tipType !==undefined){
      this.tipType=tipType;
    }
  };


  /**
   *
   */
  this.endBoard=function(){
    this.killWorkers();
    this.node.parent().trigger('end-game',this.getEndGameData());
    this.endSound.play();
  };


  //main
  this._constructor();
}
