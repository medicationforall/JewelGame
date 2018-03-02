/**
 *   Jewel Game source file Options,
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
 * Options screen.
 * @class
 */
function Options(){
  this.template='<div class="options screen">'+
  '<h2>Options</h2>'+
  '<div>'+
  'Play Speed:<div class="playSpeedContainer"><span class="playSpeed">2.0</span><br /><input name="playSpeed" type="range" min="0.1" max="10" step="0.1" value="2.0" /></div>'+
  '</div><br />'+
  '<div>Music:'+
  '<div class="musicControl">'+
  '<svg class="Icon unmute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 40px; width: 40px;"><path d="M0 0h512v512H0z" fill="transparent" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M275.5 96l-96 96h-96v128h96l96 96V96zm51.46 27.668l-4.66 17.387c52.066 13.95 88.2 61.04 88.2 114.945 0 53.904-36.134 100.994-88.2 114.945l4.66 17.387C386.81 372.295 428.5 317.962 428.5 256c0-61.963-41.69-116.295-101.54-132.332zm-12.425 46.365l-4.658 17.387C340.96 195.748 362.5 223.822 362.5 256s-21.54 60.252-52.623 68.58l4.658 17.387C353.402 331.552 380.5 296.237 380.5 256c0-40.238-27.098-75.552-65.965-85.967zm-12.424 46.363l-4.657 17.387C307.55 236.49 314.5 245.547 314.5 256s-6.95 19.51-17.047 22.217l4.658 17.387c17.884-4.792 30.39-21.09 30.39-39.604 0-18.513-12.506-34.812-30.39-39.604z" fill-opacity="1"></path></g></svg>'+
  '<svg class="Icon mute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 40px; width: 40px;"><path d="M0 0h512v512H0z" fill="transparent" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M275.5 96l-96 96h-96v128h96l96 96V96zm50.863 89.637l-12.726 12.726L371.273 256l-57.636 57.637 12.726 12.726L384 268.727l57.637 57.636 12.726-12.726L396.727 256l57.636-57.637-12.726-12.726L384 243.273l-57.637-57.636z"  fill-opacity="1"></path></g></svg>'+
  '<div class="musicVolumeContainer"><span class="musicVolume">100</span><br /><input name="musicVolume" type="range" min="0" max="100" step="1" value="100" /></div>'+
  '</div>'+
  '</div><br />'+
  '<a href="" class="apply button">Apply</a> '+
  '<a href="" class="reset button">Reset</a>'+
  '</div>';
  this.node = $(this.template);
  this.node.data('node',this);
  this.playSpeed = 2.0;
  this.musicEnabled=true;


  /**
   *
   */
  this.node.on('click','.musicControl svg',$.proxy(function(optionsControl,event){
      optionsControl.setMusic($(this).parent().hasClass('disabled'));
      optionsControl.node.find('.apply.button').addClass('changes');
  },null,this));


  /**
   *
   */
  this.setMusic=function(value){
    var musicControl = this.node.find('.musicControl');
    if(value){
      musicControl.removeClass('disabled');
    }else{
      musicControl.addClass('disabled');
    }
    this.musicEnabled=value;
  };


  /**
   *
   */
  this.node.on('input','input[name="playSpeed"]',$.proxy(function(options,event){
    var value = $(this).val();
    options.setPlaySpeed(value);
    options.node.find('.apply.button').addClass('changes');
  },null,this));


  /**
   *
   */
  this.node.on('input','input[name="musicVolume"]',$.proxy(function(options,event){
    var value = $(this).val();
    options.setMusicVolume(value);
    options.node.find('.apply.button').addClass('changes');
  },null,this));


  /**
   *
   */
  this.setPlaySpeed=function(value){
    this.playSpeed = parseFloat(value).toFixed(1);
    $('.playSpeed').text(this.playSpeed);
  };


  /**
   *
   */
  this.setMusicVolume=function(value){
    this.musicVolume = parseInt(value);
    $('.musicVolume').text(this.musicVolume);
  };


  /**
   *
   */
  this.node.on('click','.apply.button',$.proxy(function(options,event){
    event.preventDefault();
    var data = options.getData();

    if($(this).hasClass('changes')){
      $('.game.screen').data('node').setOptions(data);
      $(this).removeClass('changes');
    }else{
      console.log('no changes marked to be applied.');
    }
  },null,this));


  /**
   *
   */
  this.node.on('click','.reset.button',$.proxy(function(options,event){
    event.preventDefault();
    options.reset();
    var data = options.getData();

    $('.game.screen').data('node').setOptions(data);
  },null,this));


  /**
   *
   */
  this.getData=function(){
    var data = {};
    data.playSpeed = this.playSpeed;
    data.musicEnabled = this.musicEnabled;
    data.musicVolume = this.musicVolume;
    return data;
  };


  /**
   *
   */
  this.setOptionsFromData=function(options){
    this.setPlaySpeed(options.playSpeed);
    this.setMusic(options.musicEnabled);
    this.setMusicVolume(options.musicVolume);
    this.node.find('input[name="playSpeed"]').val(this.playSpeed);
    this.node.find('input[name="musicVolume"]').val(this.musicVolume);
  };


  /**
   *
   */
  this.reset=function(){
    this.setPlaySpeed(2);
    this.setMusic(true);
    this.setMusicVolume(100);
    this.node.find('input[name="playSpeed"]').val(this.playSpeed);
  };
}
