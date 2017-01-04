// bezierpoints.js
// PIXI graphics function to generate a smooth line through specific points
// based on https://www.particleincell.com/2012/bezier-splines/
// article: Lubos Brieda, Particle In Cell Consulting LLC, 2012
// javascript code: David Figatner, YOPEY YOPEY LLC, 2017
// MIT licensed

/**
 * @param {PIXI.Graphics} g
 * @param {number[]} points [x1, y1, x2, y2, ...] or [{x, y}, {x, y}, ...]
 */
function bezierPoints(g, points)
{
    const isArray = typeof points[0].x === 'undefined';
    const xs = [], ys = [];
    for (let i = 0, _i = points.length; i < _i; i += isArray ? 2 : 1)
    {
        if (isArray)
        {
            xs.push(points[i]);
            ys.push(points[i + 1]);
        }
        else
        {
            xs.push(points[i].x);
            ys.push(points[i].y);
        }
    }

    // not enough points to draw
    if ((isArray && points.length <= 2) || (!isArray && points.length <= 1))
    {
        return;
    }

    // two points creates a line
    if ((isArray && points.length === 4) || (!isArray && points.length === 2))
    {
        if (isArray)
        {
            g.moveTo(points[0], points[1])
                .lineTo(points[2], points[3]);
        }
        else
        {
            g.moveTo(points[0].x, points[0].y)
                .lineTo(points[1].x, points[1].y);
        }
        return;
    }

    const xResults = updateCoordinate(xs);
    const yResults = updateCoordinate(ys);
    const x = isArray ? points[0] : points[0].x;
    const y = isArray ? points[1] : points[0].y;
    g.moveTo(x, y);
    for (let i = 0, _i = points.length - 1; i < _i; i += isArray ? 2 : 1)
    {
        const index = isArray ? i / 2 : i;
        const x2 = isArray ? points[i + 2] : points[i + 1].x;
        const y2 = isArray ? points[i + 3] : points[i + 1].y;
        g.bezierCurveTo(xResults[0][index], yResults[0][index], xResults[1][index], yResults[1][index], x2, y2);
    }
}

/**
 * generate control points for x or y axis
 * from https://www.particleincell.com/2012/bezier-splines/
 * @param {number[]} K
 * @return {object[]} [cp1, cp2]
 */
function updateCoordinate(K)
{
    const p1 = [];
    const p2 = [];
    let n = K.length - 1;

    /* rhs vector */
    const a = [];
    const b = [];
    const c = [];
    const r = [];

    /* left most segment */
    a[0] = 0;
    b[0] = 2;
    c[0] = 1;
    r[0] = K[0] + 2 * K[1];

    /* internal segments */
    for (let i = 1; i < n - 1; i++)
    {
        a[i] = 1;
        b[i] = 4;
        c[i] = 1;
        r[i] = 4 * K[i] + 2 * K[i + 1];
    }

    /* right segment */
    a[n - 1] = 2;
    b[n - 1] = 7;
    c[n - 1] = 0;
    r[n - 1] = 8 * K[n - 1] + K[n];

    /* solves Ax=b with the Thomas algorithm (from Wikipedia) */
    for (let i = 1; i < n; i++)
    {
        const m = a[i] / b[i - 1];
        b[i] -= m * c[i - 1];
        r[i] -= m * r[i - 1];
    }

    p1[n - 1] = r[n - 1] / b[n - 1];
    for (let i = n - 2; i >= 0; --i)
        p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];

    /* we have p1, now compute p2 */
    for (let i = 0; i < n - 1; i++)
        p2[i] = 2 * K[i + 1] - p1[i + 1];

    p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);
    return [p1, p2];
}

module.exports = bezierPoints;