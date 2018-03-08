/**
 *   Jewel Game source file RNG,
 *   Copyright (C) 2016  James M Adams
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
 * Random number generator based on passed in seeds.
 * @class
 * @see lib/seedrandom
 * Written by James Adams Copyright 2016
 */
function Rng(seed){

  /**
   * Creates the psuedo random number generator.
   */
  this._constructor=function(){
    this._createSeed(seed);
  };

  //main
  this._constructor();
}


/**
 * Gets a random number from the seed and range.
 * @public
 * @param {string} seed unique key.
 * @param {int} min Minimun of the range.
 * @param {int} max Maximum of the range.
 * @return {int} The integer result of the roll.
 */
Rng.prototype.getRandom=function(seed, min, max){
  if(this[seed] ===undefined){
    this._createSeed(seed);
  }
  return ((this[seed]() * (max - min + 1)) + min)<<0;
};


/**
 * Gets a random number from the given range.
 * @public
 * @param {int} min Minimun of the range.
 * @param {int} max Maximum of the range.
 * @return {int} The integer result of the roll.
 */
Rng.prototype.getTrueRandom=function(min, max){
  //return ((this[seed]()*(max-min+1))+min)<<0;
  return Math.floor(Math.random()*(max-min+1)+min);
};


/**
 * Initializes a seed. If it already exists throws an error.
 * @private
 * @param {string} seed unique key.
 *
 */
Rng.prototype._createSeed=function(seed){
  if(this[seed] !==undefined){
    throw 'Seed Already exists.';
  }
  this[seed]=new Math.seedrandom(seed);
};
