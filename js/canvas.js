/*--------------------------------------------------
 Animate Header
 ---------------------------------------------------*/
(function () {
  "use strict";

  var largeHeader           = document.getElementById('header');
  var canvas                = document.getElementById('canvas');
  var ctx                   = canvas.getContext('2d');
  var numberOfClosestPoints = 4;
  var radius                = 100;

  var allPoints = [];

  activate();

  function activate() {
    resize();
    allPoints = createPoints();
    redraw(null);

    addListeners();
  }

  // Event handling
  function addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', redraw);
    }
    window.addEventListener('resize', activate);
  }


  function redraw(e) {
    var target = getTargetPosition(e);
    initAnimation(target);
  }

  function getTargetPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) {
      posx = Math.round(window.innerWidth * 3 / 4);
      posy = Math.round(window.innerHeight * 2 / 3);
    }
    else if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }

  function shouldAnimateHeader() {
    var height = window.innerHeight;
    return document.body.scrollTop <= height;
  }

  function resize() {
    var width                = window.innerWidth;
    var height               = window.innerHeight;
    largeHeader.style.height = height + 'px';
    canvas.width             = width;
    canvas.height            = height;
  }

  // animation
  function initAnimation(target) {
    if (shouldAnimateHeader()) {
      var points = getAlphaForPoints(target);

      clearCanvas();

      points.forEach(function (point) {
        point.circle.draw();
        drawLines(point);
        // shiftPoint(point);
      });
    }
  }

  function clearCanvas() {
    var width  = window.innerWidth;
    var height = window.innerHeight;
    ctx.clearRect(0, 0, width, height);
  }

  function getAlphaForPoints(target) {
    return allPoints.map(function (point) {
      var isInCircleForRadius = function (radius) {
        return isInsideCircle(target, point, radius);
      };

      if (isInCircleForRadius(radius)) {
        point.circle.alpha = 0.6;
        point.alpha        = 0.3;
      } else if (isInCircleForRadius(radius * 1.5)) {
        point.circle.alpha = 0.3;
        point.alpha        = 0.15;
      } else if (isInCircleForRadius(radius * 2.5)) {
        point.circle.alpha = 0.1;
        point.alpha        = 0.05;
      } else {
        point.circle.alpha = 0;
        point.alpha        = 0;
      }
      return point;
    });
  }

  function isInsideCircle(center, point, radius) {
    return Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2) <= Math.pow(radius, 2);
  }


  function shiftPoint(point) {
    TweenLite.to(point, 3 + Math.random(), {
      x:          point.x + getRandomIntInclusive(-30, 30),
      y:          point.y + getRandomIntInclusive(-30, 30),
      ease:       Circ.easeInOut,
      onComplete: function () {
        console.log('point', point);
        shiftPoint(point);
      }
    });
  }

// Canvas manipulation
  function drawLines(point) {
    if (!point.alpha) return;

    point.closestPoints.forEach(function (closestPoint) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(closestPoint.x, closestPoint.y);
      ctx.strokeStyle = 'rgba(255,255,255,' + point.alpha + ')';
      ctx.stroke();
    });
  }

// Util
  function Circle(pos, rad) {
    this.pos    = pos || null;
    this.radius = rad || null;

    this.draw = function () {
      if (!this.alpha) return;

      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
      ctx.fill();
    }
  }

  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createPoints() {
    var points  = [];
    var divider = 14;
    var width   = window.innerWidth;
    var height  = window.innerHeight;

    for (var x = 0; x < width; x = x + width / divider) {
      for (var y = 0; y < height; y = y + height / divider) {
        var px = x + getRandomIntInclusive(0, Math.random() * width / divider);
        var py = y + getRandomIntInclusive(0, Math.random() * height / divider);

        var p    = {x: px, y: py};
        p.circle = new Circle(p, 2 + Math.random() * 2);
        points.push(p);
      }
    }
    points = setClosestPoints(points, numberOfClosestPoints);
    return points;
  }

  function setClosestPoints(points, numberOfClosestPoints) {
    return points.map(function (p) {
      var closestPoints = [];
      for (var i = 0; i < points.length; i++) {
        var p2 = points[i];

        if (p == p2) {
          continue;
        }

        if (closestPoints.length < numberOfClosestPoints) {
          closestPoints.push(p2);
        }
        else {
          var distance = getDistance(p, p2);
          var index    = closestPoints.findIndex(function (closePoint) {
            return distance < getDistance(p, closePoint);
          });
          if (index > -1) {
            closestPoints[index] = p2;
          }
        }
      }

      p.closestPoints = closestPoints;
      return p;
    });
  }
})
();


if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list    = Object(this);
    var length  = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

