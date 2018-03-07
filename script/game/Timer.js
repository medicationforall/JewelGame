/**
 *   Jewel Game source file Timer,
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
 * Level timer when it reaches the end it triggers an end level state.
 * @class
 */
function Timer(){
  this.template='<div class="timer">'+
  '<div class="timerBar"></div>'+
  '</div>';
  this.node=$(this.template);
  this.node.data('node',this);

  this.masterTime = 60;
  this.timeLeft = 0;
  this.timerId = undefined;


  /**
   * Sets the master time limit.
   * @param {int} value Time limit value.
   */
  this.setTimeLimit=function(value){
    this.masterTime = parseInt(value);
  };


  /**
   * Initiates the timer.
   */
  this.startTimer=function(){
    this.countDown(this.masterTime);
  };


  /**
   * Creates a timer if needed.
   * @param {int} time Time to countdown from.
   */
  this.countDown = function(time){
    if(time>0){
      //console.log('create countdown');
      this.node.find('.timerBar').css('width','100%').removeClass('red yellow');
      this.createTimer(time);
    }
  };


  /**
   * Creates the actual setInterval timer.
   * @param {int} time
   */
  this.createTimer=function(time){
    var timeTotal = time;
    this.timeLeft = time;

    if(this.timerId===undefined){
      this.timerId = setInterval($.proxy(this.stepTime,this,timeTotal), 1000);
    }
  };


  /**
   * Performs actual work at each step.
   * @param {int} timeTotal
   */
  this.stepTime=function(timeTotal){
    this.timeLeft--;
    var decrement = 100/timeTotal;
    var endWidth =  this.timeLeft*decrement;

    this.node.find('.timerBar').css('width',endWidth+'%');
    this.resolveColor(endWidth);

    //end check
    if(endWidth <= 0 || this.timeLeft === 0){
      console.log('end timer');
      clearInterval(this.timerId);
      this.timerId=undefined;
      this.endTimer();
    }
  };


  /**
   * Resolve the color of the timerBar based on it's width
   * @param {int} width
   */
  this.resolveColor=function(width){
    var timerBar = this.node.find('.timerBar');
    timerBar.removeClass('red yellow');

    if(width<=50&&width>=30){
      timerBar.addClass('yellow');
    }else if(width<30&&width>=0){
      timerBar.addClass('red');
    }
  };


  /**
   * Increase an ongoing timer.
   * @param {increment}
   */
  this.increaseTime=function(increment){
    this.timeLeft=this.timeLeft+increment;
  };


  /**
   * Reset the timer, and restart the timer if master time is not 0.
   */
  this.reset=function(){
    this.timeLeft=0;
    clearInterval(this.timerId);
    this.timerId=undefined;
    if(this.masterTime>0){
      this.countDown(this.masterTime);
    }
  };


  /**
   * Action to take when the timer ends.
   */
  this.endTimer=function(){
    $('.board').data('node').endBoard();
  };


  /**
   * Kills the pending timer.
   */
  this.killTimer=function(){
    if(this.timerId){
      clearInterval(this.timerId);
      this.timerId=undefined;
    }

    this.setTimeLimit(0);
    this.reset();
  };
}
