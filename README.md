# bezierpoints
PIXI graphics function to generate a smooth line through specific points

## Live Example and Sample code
https://davidfig.github.io/bezierpoints/

## example

    const bezierpoints = require('bezierpoints')

    const renderer = PIXI.autoDetectRenderer(800, 600)
    document.body.appendChild(renderer.view)

    const g = new PIXI.Graphics()
    g.lineStyle(10, 0xff0000)

    bezierpoints(g, [53, 100, 90, 150, 180, 32, 250, 23])

    renderer.render(g)

## Installation

    npm i bezierpoints

## API

### function bezierPoints(g, points)

- {PIXI.Graphics} g
- {number[]|object[]} points [x1, y1, x2, y2, ...] or [{x, y}, {x, y}, ...]


## license  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)