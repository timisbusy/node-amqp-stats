var request = require('request'),
    qs = require('qs');

function AmqpStats (_options) {
  var options = _options || {};
  this.hostname = options.hostname || 'localhost:55672';
  this.username = options.username || 'guest';
  this.password = options.password || 'guest';
  this.protocol = options.protocol || 'http';
};

// Overview

AmqpStats.prototype.overview = function getOverview (callback) {
  this.sendRequest('GET', 'overview/', {}, callback);
};

// Nodes

AmqpStats.prototype.nodes = function getNodes (callback) {
  this.sendRequest('GET', 'nodes/', {}, callback);
};

AmqpStats.prototype.getNode = function getNode (name, callback) {
  this.sendRequest('GET', 'nodes/' + encodeURIComponent(name) + '/', {}, callback);
};

// Extensions

AmqpStats.prototype.extensions = function getExtensions (callback) {
  this.sendRequest('GET', 'extensions/', {}, callback);
};

AmqpStats.prototype.definitions = function getDefinitions (callback) {
  this.sendRequest('GET', 'definitions/', {}, callback);
};

// Connections

AmqpStats.prototype.connections = function getConnections (callback) {
  this.sendRequest('GET', 'connections/', {}, callback);
};

AmqpStats.prototype.getConnection = function getConnection (name, callback) {
  this.sendRequest('GET', 'connections/' + encodeURIComponent(name) + '/', {}, callback);
};

// Channels

AmqpStats.prototype.channels = function getChannels (options, callback) {
  if(typeof options === 'function'){
    callback = options;
    options = {};
  }
  this.sendRequest('GET', 'channels/', options, callback);
};

AmqpStats.prototype.getChannel = function getChannel (name, callback) {
  this.sendRequest('GET', 'channels/' + encodeURIComponent(name) + '/', {}, callback);
};

// Exchanges

AmqpStats.prototype.exchanges = function getExchanges (options, callback) {
  if(typeof options === 'function'){
    callback = options;
    options = {};
  }
  this.sendRequest('GET', 'exchanges/', options, callback);
};

AmqpStats.prototype.getExchangesForVHost = function getExchangesForVHost (vhost, callback) {
  this.sendRequest('GET', 'exchanges/' + encodeURIComponent(vhost) + '/', {}, callback);
};

AmqpStats.prototype.getExchange = function getExchange (vhost, name, callback) {
  this.sendRequest('GET', 'exchanges/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/', {}, callback);
};

AmqpStats.prototype.getBindingsWithSource = function getBindingsWithSource (vhost, name, callback) {
  this.sendRequest('GET', 'exchanges/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/bindings/source/', {}, callback);
};

AmqpStats.prototype.getBindingsWithDestination = function getBindingsWithDestination (vhost, name, callback) {
  this.sendRequest('GET', 'exchanges/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/bindings/destination/', {}, callback);
};

// Queues

AmqpStats.prototype.queues = function getQueues (options, callback) {
  if(typeof options === 'function'){
    callback = options;
    options = {};
  }
  this.sendRequest('GET', 'queues/', options, callback);
};

AmqpStats.prototype.getQueuesForVHost = function getQueuesForVHost (vhost, callback) {
  this.sendRequest('GET', 'queues/' + encodeURIComponent(vhost) + '/', {}, callback);
};

AmqpStats.prototype.getQueue = function getQueue (vhost, name, callback) {
  this.sendRequest('GET', 'queues/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/', {}, callback);
};

AmqpStats.prototype.getBindingsForQueue = function getBindingsForQueue (vhost, name, callback) {
  this.sendRequest('GET', 'queues/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/bindings/', {}, callback);
};

// Bindings

AmqpStats.prototype.bindings = function getBindings (options, callback) {
  if(typeof options === 'function'){
    callback = options;
    options = {};
  }
  this.sendRequest('GET', 'bindings/', options, callback);
};

AmqpStats.prototype.getBindingsForVHost = function getBindingsForVHost (vhost, callback) {
  this.sendRequest('GET', 'bindings/' + encodeURIComponent(vhost) + '/', {}, callback);
};

AmqpStats.prototype.getBindingsForExchangeAndQueue = function getBindingsForExchangeAndQueue (vhost, exchange, queue, callback) {
  this.sendRequest('GET', 'queues/' + encodeURIComponent(vhost) + '/e/' + encodeURIComponent(exchange) + '/q/' + encodeURIComponent(queue) + '/', {}, callback);
};

// Virtual Hosts

AmqpStats.prototype.vhosts = function getVHosts (callback) {
  this.sendRequest('GET', 'vhosts/', {}, callback);
};

AmqpStats.prototype.getVHost = function getVHost (name, callback) {
  this.sendRequest('GET', 'vhosts/' + encodeURIComponent(name) + '/', {}, callback);
};

AmqpStats.prototype.getVHostPermissions = function getVHostPermissions (name, callback) {
  this.sendRequest('GET', 'vhosts/' + encodeURIComponent(name) + '/permissions/', {}, callback);
};

// Users

AmqpStats.prototype.users = function getUsers (callback) {
  this.sendRequest('GET', 'users/', {}, callback);
};

AmqpStats.prototype.getUser = function getUser (name, callback) {
  this.sendRequest('GET', 'users/' + encodeURIComponent(name) + '/', {}, callback);
};

AmqpStats.prototype.getUserPermissions = function getVHostPermissions (name, callback) {
  this.sendRequest('GET', 'users/' + encodeURIComponent(name) + '/permissions/', {}, callback);
};

// Who Am I?

AmqpStats.prototype.whoami = function whoami (callback) {
  this.sendRequest('GET', 'whoami/', {}, callback);
};

// Permissions

AmqpStats.prototype.permissions = function getPermissions (callback) {
  this.sendRequest('GET', 'permissions/', {}, callback);
};

AmqpStats.prototype.getPermissionsForUserOnVHost = function getPermissionsForUserOnVHost (vhost, name, callback) {
  this.sendRequest('GET', '/permissions/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/', {}, callback);
};

// Aliveness

AmqpStats.prototype.alive = function alivenessTest (vhost, callback) {
  this.sendRequest('GET', 'aliveness-test/' + encodeURIComponent(vhost) + '/', {}, callback);
};

// Utility used by all other calls. Can also be used seperately to make any API call not specified above.

AmqpStats.prototype.sendRequest = function sendRequest (method, path, params, callback) {
  request({
    method: method,
    url: this.protocol + "://" + this.username + ":" + this.password + "@" + this.hostname + "/api/" + path + qs.stringify(params),
    body: qs.stringify(params),
    form: true
  }, function(err, res, data){
    //console.log(err);
    //console.log(res.statusCode);
    //console.log('data: ', data);
    if (err) { 
      callback(err);
    } else if (res.statusCode > 200) {
      callback(new Error("Status code: "+ res.statusCode));
    } else if (data === "Not found.") {
      callback(new Error("Undefined."));
    } else {
      data = JSON.parse(data);
      callback(null, res, data);
    }
  });
}

module.exports = AmqpStats;
