# Node.js Interface for RabbitMQ Management Statistics

### This package creates an easy interface for getting statistics from a RabbitMQ instance with the management plugin installed. Read more about the management plugin here:

- http://www.rabbitmq.com/management.html
- https://cdn.rawgit.com/rabbitmq/rabbitmq-management/v3.7.15/priv/www/api/index.html

## Required

You will need:

1. An instance of RabbitMQ (running locally or in the cloud)
2. The Management Plugin
3. Node Version >= 8 to use Async / Await.

## Installation

    npm install amqp-stats-promised

## Usage

Require the amqp-stats package: 

    var AMQPStats = require('amqp-stats-promised');

Instantiate and provide authentication details (defaults to standard setup for a local instance). 

    var stats = new AMQPStats({
      username: "AMQP_USERNAME", // default: guest
      password: "AMQP_PASSWORD", // default: guest
      hostname: "AMQP_HOSTNAME", // default: localhost:55672
      protocol: "HTTP_OR_HTTPS"  // default: http
    });

NOTE: for RabbitMQ instances running on heroku, the hostname should look something like: 

    heroku.srs.rabbitmq.com/rabbitmq/sdaewywqh

From there you can use the stats instance to get data about your system's usage:

    const overview = await stats.overview();
    console.log(overview);

To Assist Errors you can use Try / Catch block, as example bellow:

    try {
        const overview = await stats.overview();
        console.log(overview);
    } catch (e) {
        console.log(e);
    }

This will return a list of your queues with lots of data about their rate of use, total messages sent, etc:

    const queues = stats.queues();
    console.log(queues);

Note that when you lack admin privileges (on heroku instances for example) you may not be able to get at certain parts of this API. You can check your status with:

    const whoami = stats.whoami();
    console.log(whoami);