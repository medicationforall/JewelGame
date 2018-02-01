/**
 * Random number generator based on passed in seeds.
 * @see lib/seedrandom
 * Written by James Adams Copyright 2016
 * @todo change how the rng's are stored so that they aren't registered directly against the rng object.
 * @todo move to MJS?
 */
function Rng(seed){

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


