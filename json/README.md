# LevelSet
A list of levels.

## Properties

- name (string, optional)
- levels (array[Level], required)
  - name (string, required) Name of the level.
  - seed (string, optional) Seed for block creation.
  - width (int, required) Number of columns.
  - height (int, required) Number of rows.
  - colors (array[string] *red|orange|yellow|green|blue|purple|rainbow|stone|warp*, optional) When creating blocks use these colors.
  - shapes (array[string] *triangle|square|pentagon|rabbet|start|circle*, optional) When creating blocks use these shapes.
  - timeLimit (int, optional) Apply a time limit to the level.
  - endCondition (object, required) Specifies how the end level win condition.
    - *maxScore|minScore|remainingMoves|minMoves|remainingJewels|minJewels* (int, required) Key is the wincondition type, the value what the player must achieve.
  - tipType (string *score|move*, optional) What all of tips are triggered by.
  - tips (array[Tip, optional]) List of tips to be displayed when certain conditions are met.
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



## Level Example

```
{
  "name": "Stone 8x8",
  "seed": "8x8",
  "width": 8,
  "height": 8,
  "colors": ["red", "green", "blue", "orange", "purple","yellow","stone"],
  "shapes": ["square", "circle", "pentagon", "rabbet","star"],
  "endCondition": {
    "maxScore": 50
  }
}
```
