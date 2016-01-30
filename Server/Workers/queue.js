function Queue (name, client) {
  this.name = name;
  this.client = client;
  this.timeout = 0;
}

Queue.prototype.push = function (data, callback) {
  this.client.rpush([this.name, data], function(err, replies){
    callback();
  }.bind(this));
};

Queue.prototype.pop = function (callback) {
  this.client.blpop(this.name, this.timeout, callback);
};

module.exports = Queue;