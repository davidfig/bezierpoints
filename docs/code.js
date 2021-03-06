const PIXI = require('pixi.js')
const Renderer = require('yy-renderer')

const bezierPoints = require('..')
const touches = require('touches')

const renderer = new Renderer({autoresize: true})
renderer.canvas.style.pointerEvents = 'none'

const count = 5 // test using count = 1 and 2
const circles = []
const radius = 20, radiusSquared = radius * radius
const w = window.innerWidth / (count + 1), h = window.innerHeight
for (let i = 0; i < count; i++)
{
    circles[i] = {x: w + (i * w), y: Math.random() * h}
}
const g = renderer.add(new PIXI.Graphics())
draw()

function draw()
{
    g.clear()
        .lineStyle(10, 0, 0.5)
    bezierPoints(g, circles)
    g.lineStyle(0)
    for (let circle of circles)
    {
        g.beginFill(0xff0000, 0.5)
            .drawCircle(circle.x, circle.y, radius)
            .endFill()
    }
    renderer.render()
}

/****** INPUT CODE *******/

touches(window, {target: renderer.canvas, filtered: true})
    .on('start', down)
    .on('move', move)
    .on('end', up)

let _down = false
function down(e, position)
{
    for (let i = 0; i < count; i++)
    {
        const circle = circles[i]
        if (Math.pow(position[0] - circle.x, 2) + Math.pow(position[1] - circle.y, 2) <= radiusSquared)
        {
            e.preventDefault()
            _down = i
        }
    }
}

function move(e, position)
{
    if (_down !== false)
    {
        circles[_down].x = position[0]
        circles[_down].y = position[1]
        draw()
    }
}

function up()
{
    _down = false
}

window.onload = require('./highlight')

// // for eslint
// /* globals window */