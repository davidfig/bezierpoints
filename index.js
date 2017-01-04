const PIXI = require('pixi.js');
const Renderer = require('yy-renderer');
const bezierPoints = require('../bezierpoints/bezierpoints.js');
const touches = require('touches');

// creates the renderer
const renderer = new Renderer({autoresize: true, resolution: window.devicePixelRatio});
renderer.canvas.style.pointerEvents = 'none';

const count = 5;
const circles = [];
const radius = 20, radiusSquared = radius * radius;
const w = window.innerWidth / (count + 1), h = window.innerHeight;
for (let i = 0; i < count; i++)
{
    circles[i] = {x: w + (i * w), y: Math.random() * h};
}
const g = renderer.add(new PIXI.Graphics());
draw();

touches(window, {target: renderer.canvas, filtered: true})
    .on('start', down)
    .on('move', move)
    .on('end', up);

let _down = false;
function down(e, position)
{
    for (let i = 0; i < count; i++)
    {
        const circle = circles[i];
        if (Math.pow(position[0] - circle.x, 2) + Math.pow(position[1] - circle.y, 2) <= radiusSquared)
        {
            e.preventDefault();
            _down = i;
        }
    }
}

function move(e, position)
{
    if (_down !== false)
    {
        circles[_down].x = position[0];
        circles[_down].y = position[1];
        draw();
    }
}

function up()
{
    _down = false;
}

function draw()
{
    g.clear()
        .lineStyle(10, 0, 0.5);
    bezierPoints(g, circles);
    g.lineStyle(0);
    for (let circle of circles)
    {
        g.beginFill(0xff0000, 0.5)
            .drawCircle(circle.x, circle.y, radius)
            .endFill();
    }
    renderer.render();
}

// // set initial position for all triangles
// for (var i = 0; i < 100; i++)
// {
//     var t = triangle(Math.random() * renderer.width * 0.1, Math.random() * 0xffffff);
//     t.position.set(Math.random() * renderer.width, Math.random() * renderer.height);
//     next;
// }
// move();
// Update.add(move, {time: 6000});

// Debug.log('Notice the render light above automatically turns off when the animations stop.');

// // animate one triangle with random values
// function next(t)
// {
//     var x = Math.random() * renderer.width;
//     var y = Math.random() * renderer.height;
//     var scaleX = Math.random() * 3;
//     var scaleY = Math.random() * 3;
//     var alpha = 0.5 * Math.random();
//     var rotation = Math.random() * Math.PI * 2;
//     var time = 1000 + Math.random() * 4000;
//     new Animate.to(t, {alpha: alpha, x: x, y: y, scale: {x: scaleX, y: scaleY}, rotation: rotation}, time, {renderer: renderer, ease: 'easeInOutSine'});
// }

// // animate all objects
// function move()
// {
//     for (var i = 0; i < renderer.stage.children.length; i++)
//     {
//         next(renderer.stage.children[i]);
//     }
// }

// // create the triangles
// function triangle(size, color)
// {
//     var half = size / 2;
//     var g = new PIXI.Graphics();
//     renderer.add(g);
//     g.beginFill(color);
//     g.moveTo(0, -half);
//     g.lineTo(-half, half);
//     g.lineTo(half, half);
//     g.closePath();
//     g.endFill();
//     return g;
// }

window.onload = require('./highlight-code.js');

// // for eslint
// /* globals window */