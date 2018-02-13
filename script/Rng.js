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
 * @see lib/seedrandom
 * Written by James Adams Copyright 2016
 * @todo change how the rng's are stored so that they aren't registered directly against the rng object.
 * @todo move to MJS?
 */
function Rng(seed){

  /**
   *
   */
  this._constructor=function(){
    this.createSeed(seed);
  };

  //main
  this._constructor();
}


/**
 * Returns a new random number from the seed.
 */
Rng.prototype.getRandom=function(seed, min, max){
  if(this[seed] ===undefined){
    this.createSeed(seed);
  }
  return ((this[seed]() * (max - min + 1)) + min)<<0;
};


/*
 * Initializes a seed. If it already exists throws an error.
 */
Rng.prototype.createSeed=function(seed){
  if(this[seed] !==undefined){
    throw 'Seed Already exists.';
  }
  this[seed]=new Math.seedrandom(seed);
};
