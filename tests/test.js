var Stats = require('../index.js');
var conf = require('./conf.json');

var stats = new Stats(conf); // defaults to localhost, be sure you have mgmt plugin installed: http://www.rabbitmq.com/management.html

stats.whoami(function (err, res, data) {
  if(err) { throw err; }
  console.log('data: ', data);
});

stats.queues(function(err, res, data){
  if (err) { throw err; }
  console.log('data: ', data);
  data.forEach(function (queue) {
    if(queue.message_stats){
      console.log('name: ', queue.name);
      console.log('message_stats: ', queue.message_stats.deliver_get);
    }
  });
});
