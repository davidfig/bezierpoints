# bezierpoints
PIXI graphics function to generate a smooth line through specific points

## Live Example and Sample code
https://davidfig.github.io/bezierpoints/

## Installation

    npm i --save bezierpoints

## API

/**
 * @param {PIXI.Graphics} g
 * @param {number[] | object[]} points [x1, y1, x2, y2, ...] or [{x, y}, {x, y}, ...]
 */
function bezierPoints(g, points)

## quick usage

var bezierpoints = require('bezierpoints');

var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

var g = new PIXI.Graphics();
g.lineStyle(10, 0xff0000);

bezierpoints(g, [53, 100, 90, 150, 180, 32, 250, 23]);

renderer.render(g);