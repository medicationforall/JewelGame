# LevelSet
Is a listing of levels.

## Basic Example
This is a very basic levelSet definition with two levels.

```
{
  levels:[
    {
      "name": "R-4",
      "width": 4,
      "height": 4,
      "colors": ["red", "green", "orange", "yellow", "purple"],
      "shapes": ["square", "circle", "triangle", "pentagon", "rabbet", "star"],
      "endCondition": {"remainingJewels": 60}
    }, {
    	"name": "Cool Colors",
    	"seed": "coolco",
    	"width": 4,
    	"height": 4,
    	"colors": ["stone", "warp", "purple", "blue", "green"],
    	"shapes": ["triangle", "square", "pentagon", "circle", "rabbet"],
    	"endCondition": {"maxScore": 30}
    }
  ]
}
```
The first level "R-4" does not have a seed and it's block placement will always be random everytime the level is played. The second level "Cool Colors" does have a seed and it's block placement will be the same everytime the level is played.


## Properties

- name (string, optional) Name of the levelSet.
- levels (array[Level], required) The list of levels.
  - name (string, required) Name of the level.
  - seed (string, optional) When set makes block creation repeatable.
  - width (int, required) Number of columns.
  - height (int, required) Number of rows.
  - colors (array[string] *red|orange|yellow|green|blue|purple|rainbow|stone|warp*, optional) When creating blocks use these colors.
  - shapes (array[string] *triangle|square|pentagon|rabbet|start|circle*, optional) When creating blocks use these shapes.
  - timeLimit (int, optional) Apply a time limit to the level.
  - endCondition (object, required) Specifies how the end level win condition.
    - *maxScore|minScore|remainingMoves|minMoves|remainingJewels|minJewels* (int, required) Key is the wincondition type, the value what the player must achieve.
  - tipType (string *score|move*, optional) What all of tips are triggered by.
  - tips (array[Tip], optional) List of tips to be displayed when certain conditions are met.
    - *score|move* (int, required) Key is the trigger condition, value is when it's triggered.
    - message (string, required) Message to be displayed
    - highlight (array[int], optional) List of cells to be highlighted
    - enabled (boolean, optional) If the tip is enabled.
  - startBlocks (array[Block], optional) List of block to use instead of random generation.
    - color (string *red|orange|yellow|green|blue|purple|rainbow|stone|warp|random*, required) Color of the block.
    - shape (string *triangle|square|pentagon|rabbet|start|circle|random*, required) Shape of the Block.
  - levelBlocks (array[LevelBlock], optional) List of levelBlocks triggered on certain conditions
    - trigger (string *score|move|jewels*, required) Trigger type of the level block change.
    - value (int, required) When the levelBlock is triggered.
    - colors (array[string] *red|orange|yellow|green|blue|purple|rainbow|stone|warp*, optional) When creating blocks use these colors.
    - shapes (array[string] *triangle|square|pentagon|rabbet|start|circle*, optional) When creating blocks use these shapes.
    - blocks (array[Block], optional) List of block to use instead of random generation.
      - color (string *red|orange|yellow|green|blue|purple|rainbow|stone|warp*, required) Color of the block.
      - shape (string *triangle|square|pentagon|rabbet|start|circle*, required) Shape of the Block.
