var Entities = require('../src/entities').Entities;
var Collider = require('../src/collider').Collider;

var MockCoquette = function() {
  this.game = "woo";
  this.entities = new Entities(this, this.game);
  this.collider = new Collider(this);
};

var Thing = function() {};

describe('Entities', function() {
  describe('update()', function() {
    it('should call update all entities', function() {
      var update = function() { this.updateCalled = true; };
      var c = new MockCoquette();
      c.entities._entities.push({ update: update}, { update: update });
      c.entities.update();
      expect(c.entities.all()[0].updateCalled).toEqual(true);
      expect(c.entities.all()[1].updateCalled).toEqual(true);
    });

    it('should pass interval when call update on entity', function() {
      var c = new MockCoquette();
      c.entities._entities.push({ update: function(interval) { this.interval = interval; }});
      c.entities.update(5);
      expect(c.entities.all()[0].interval).toEqual(5);
    });
  });

  describe('all()', function() {
    it('should return all entities when no constructor passed', function() {
      var c = new MockCoquette();
      c.entities._entities.push({ }, { });
      expect(c.entities.all().length).toEqual(2);
    });

    it('should return only entities made w constructor when constructor passed', function() {
      var c = new MockCoquette();
      c.entities._entities.push({}, new Thing(), new Thing(), {});
      expect(c.entities.all().length).toEqual(4);
      expect(c.entities.all(Thing).length).toEqual(2);
    });
  });

  describe('create()', function() {
    it('should create the thing you ask it to create', function() {
      var c = new MockCoquette();
      c.entities.create(Thing);
      expect(c.entities.all()[0] instanceof Thing).toEqual(true);
    });

    it('should return created thing', function() {
      var c = new MockCoquette();
      var thing = c.entities.create(Thing);
      expect(thing instanceof Thing).toEqual(true);
    });

    it('should be ok without passed settings ', function() {
      var c = new MockCoquette();
      c.entities.create(Thing);
      expect(c.entities.all().length).toEqual(1);
    });

    it('should pass game to obj constructor', function() {
      var c = new MockCoquette();
      var Thing = function(game) {
        this.called = true;
        expect(game).toEqual(c.game);
      };
      c.entities.create(Thing, { a:1 });
      expect(c.entities.all()[0].called).toEqual(true);
    });

    it('should pass settings to obj constructor', function() {
      var c = new MockCoquette();
      var Thing = function(__, settings) {
        this.called = true;
        expect(settings).toEqual({ a:1 });
      };
      c.entities.create(Thing, { a:1 });
      expect(c.entities.all()[0].called).toEqual(true);
    });
  });

  describe('destroy()', function() {
    it('should destroy the thing you ask it to destroy', function() {
      var c = new MockCoquette();
      c.entities.create(Thing);
      expect(c.entities.all()[0] instanceof Thing).toEqual(true);
      c.entities.destroy(c.entities.all()[0]);
      expect(c.entities.all()[0]).toBeUndefined();
    });
  });
});
