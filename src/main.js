var Renderer = require('./renderer');
var Inputter = require('./inputter');
var Entities = require('./entities');
var Runner = require('./runner');
var Collider = require('./collider');
var Ticker = require('./ticker');

var Coquette = function(game, canvasId, width, height, backgroundColor, autoFocus) {
  var canvas = document.getElementById(canvasId);
  this.renderer = new Renderer(this, game, canvas, width, height, backgroundColor);
  this.inputter = new Inputter(this, canvas, autoFocus);
  this.entities = new Entities(this, game);
  this.runner = new Runner(this);
  this.collider = new Collider(this);

  var self = this;
  this.ticker = new Ticker(this, function(interval) {
    self.runner.update(interval);
    if (game.update !== undefined) {
      game.update(interval);
    }

    self.entities.update(interval)
    self.collider.update(interval);
    self.renderer.update(interval);
    self.inputter.update();
  });
};

Coquette.Renderer = Renderer;
Coquette.Inputter = Inputter;
Coquette.Entities = Entities;
Coquette.Runner = Runner;
Coquette.Collider = Collider;
Coquette.Ticker = Ticker;

module.exports = Coquette;
