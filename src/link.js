var tau = 2 * Math.PI;

export default function(links) {
  var strength = 0.5, // TODO per-link strength on initialization
      distance = 30, // TODO per-link distance on initialization
      nodes,
      bias;

  function force(alpha) {
    for (var i = 0, n = links.length, link, source, target, x, y, l, b; i < n; ++i) {
      link = links[i], source = link.source, target = link.target;
      x = target.x - source.x;
      y = target.y - source.y;
      if (l = x * x + y * y) l = Math.sqrt(l), l = (l - distance) / l;
      else l = Math.random() * tau, x = Math.cos(l), y = Math.sin(l), l = distance;
      l *= alpha * strength, x *= l, y *= l;
      target.vx -= x * (b = bias[i]);
      target.vy -= y * b;
      source.vx += x * (b = 1 - b);
      source.vy += y * b;
    }
  }

  function initialize() {
    var i, n = nodes.length, m = links.length, k = new Array(n), l;
    for (i = 0; i < n; ++i) k[i] = 0;
    for (i = 0, bias = new Array(m); i < m; ++i) l = links[i], ++k[l.source.index], ++k[l.target.index];
    for (i = 0; i < m; ++i) l = links[i], bias[i] = k[l.source.index] / (k[l.source.index] + k[l.target.index]);
  }

  force.nodes = function(_) {
    return arguments.length ? (nodes = _, initialize(), force) : nodes;
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.distance = function(_) {
    return arguments.length ? (distance = +_, force) : distance;
  };

  return force;
}
