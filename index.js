const request = require('request-promise');
const qs = require('qs');

/**
 * @class AmqpStats
 * @description AmqpStats was build for node.js was original built by https://github.com/timisbusy/node-amqp-stats, user timisbusy, 
 * this project is a new AmqpStats using Promises as default and ES6 features.
 * @version 1.0.0
 */

class AmqpStats {
	constructor(_options) {
		const options = _options || {};
		this.hostname = options.hostname || 'localhost:55672';
		this.username = options.username || 'guest';
		this.password = options.password || 'guest';
		this.protocol = options.protocol || 'http';
	}

	/**
	 * @description Various random bits of information that describe the whole system.
	 */

	async overview() {
		return this.sendRequest('GET', 'overview/');
	}

	/**
	 * @description A list of nodes in the RabbitMQ cluster.
	 */

	async nodes() {
		return this.sendRequest('GET', 'nodes/');
	}

	/**
	 * @param {*} name Node Name
	 * @description An individual node in the RabbitMQ cluster.
	 */

	async getNode(name) {
		return this.sendRequest('GET', 'nodes/' + encodeURIComponent(name) + '/');
	}

	/**
	 * @description A list of extensions to the management plugin.
	 */
	
	async extensions() {
		return this.sendRequest('GET', 'extensions/');
	}

	/**
	 * @description The server definitions - exchanges, queues, bindings, users, virtual hosts, permissions, topic permissions, and parameters. Everything apart from messages.
	 */

	async definitions() {
		return this.sendRequest('GET', 'definitions/');
	};

	/**
	 * @description A list of all open connections.
	 */

	async connections() {
		return this.sendRequest('GET', 'connections/');
	}
	/**
	 * @param {*} name Name of connection.
	 * @description An individual connection.
	 */

	async getConnection(name) {
		return this.sendRequest('GET', 'connections/' + encodeURIComponent(name) + '/');
	};

	/**
	 * @description A list of all open channels.
	 */

	async channels() {
		return this.sendRequest('GET', 'channels/');
	};

	/**
	 * @param {*} name Channel Name
	 * @description Details about an individual channel.
	 */

	async getChannel(name) {
		return this.sendRequest('GET', 'channels/' + encodeURIComponent(name) + '/');
	};

	/**
	 * @description A list of all exchanges.
	 */

	async exchanges() {
		return this.sendRequest('GET', 'exchanges/');
	};

	/**
	 * 
	 * @param {*} vhost vhost name
	 * @description A list of all exchanges in a given virtual host.
	 */

	async getExchangesForVHost(vhost) {
		return this.sendRequest('GET', 'exchanges/' + encodeURIComponent(vhost) + '/');
	}

	/**
	 * @description An individual exchange.
	 * @param {*} vhost vhost name
	 * @param {*} name exchange name
	 */

	async getExchange(vhost, name) {
		return this.sendRequest('GET', 'exchanges/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/');
	};

	/**
	 * @description A list of all bindings in which a given exchange is the source.
	 * @param {*} vhost vhost name
	 * @param {*} name exchange name
	 */

	async getBindingsWithSource(vhost, name) {
		return this.sendRequest('GET', 'exchanges/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/bindings/source/');
	};

	/**
	 * @description A list of all bindings in which a given exchange is the destination.
	 * @param {*} vhost vhost name
	 * @param {*} name exchange name
	 */

	async getBindingsWithDestination(vhost, name) {
		return this.sendRequest('GET', 'exchanges/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/bindings/destination/');
	};

	/**
	 * @description A list of all queues.
	 */

	async queues() {
		return this.sendRequest('GET', 'queues/');
	};

	/**
	 * @description A list of all queues in a given virtual host.
	 * @param {*} vhost vhost name
	 */

	async getQueuesForVHost(vhost) {
		return this.sendRequest('GET', 'queues/' + encodeURIComponent(vhost) + '/');
	};

	/**
	 * @description An individual queue.
	 * @param {*} vhost vhost name
	 * @param {*} name queue name
	 */

	async getQueue(vhost, name) {
		return this.sendRequest('GET', 'queues/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/');
	};

	/**
	 * @description A list of all bindings on a given queue.
	 * @param {*} vhost vhost name
	 * @param {*} name queue name
	 */

	async getBindingsForQueue(vhost, name) {
		return this.sendRequest('GET', 'queues/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/bindings/');
	};

	/**
	 * @description A list of all bindings.
	 */

	async bindings() {
		return this.sendRequest('GET', 'bindings/');
	};

	/**
	 * @description A list of all bindings in a given virtual host.
	 * @param {*} vhost vhost name
	 */

	async getBindingsForVHost(vhost) {
		return this.sendRequest('GET', 'bindings/' + encodeURIComponent(vhost) + '/');
	};

	/**
	 * @description A list of all bindings between an exchange and a queue. Remember, an exchange and a queue can be bound together many times!
	 * @param {*} vhost vhost name
	 * @param {*} exchange exchange name
	 * @param {*} queue queue name
	 */

	async getBindingsForExchangeAndQueue(vhost, exchange, queue) {
		return this.sendRequest('GET', `queues/${encodeURIComponent(vhost)}/e/${encodeURIComponent(exchange)}/q/${encodeURIComponent(queue)}/`);
	};

	/**
	 * @description A list of all vhosts.
	 */

	async vhosts() {
		return this.sendRequest('GET', 'vhosts/');
	};

	/**
	 * @description An individual virtual host.
	 * @param {*} name vhost name
	 */

	async getVHost(name) {
		return this.sendRequest('GET', 'vhosts/' + encodeURIComponent(name) + '/');
	};

	/**
	 * @description A list of all permissions for a given virtual host.
	 * @param {*} name vhost name
	 */

	async getVHostPermissions(name) {
		return this.sendRequest('GET', 'vhosts/' + encodeURIComponent(name) + '/permissions/');
	};

	/**
	 * @description A list of all users.
	 */

	async users() {
		return this.sendRequest('GET', 'users/');
	};

	/**
	 * @description Get an individual user.
	 * @param {*} name user name
	 */

	async getUser(name) {
		return this.sendRequest('GET', 'users/' + encodeURIComponent(name) + '/');
	};

	/**
	 * @description A list of all permissions for a given user.
	 * @param {*} name user name
	 */

	async getUserPermissions(name) {
		return this.sendRequest('GET', 'users/' + encodeURIComponent(name) + '/permissions/');
	};

	/**
	 * @description Details of the currently authenticated user.
	 */

	async whoami() {
		return this.sendRequest('GET', 'whoami/');
	};

	/**
	 * @description A list of all permissions for all users.
	 */

	async permissions() {
		return this.sendRequest('GET', 'permissions/');
	};

	/**
	 * @description An individual permission of a user and virtual host. 
	 * @param {*} vhost vhost name
	 * @param {*} name permissin name
	 */

	async getPermissionsForUserOnVHost(vhost, name) {
		return this.sendRequest('GET', '/permissions/' + encodeURIComponent(vhost) + '/' + encodeURIComponent(name) + '/');
	};

	/**
	 * @description Declares a test queue, then publishes and consumes a message. Intended for use by monitoring tools. If everything is working correctly, will return HTTP status 200 with body: {'status' : 'ok'}
	 * @param {*} vhost 
	 */

	async alive(vhost) {
		return this.sendRequest('GET', 'aliveness-test/' + encodeURIComponent(vhost) + '/');
	};
	
	/**
	 * 
	 * @param {*} method Request Method, like GET, POST, PUT, DELETE
	 * @param {*} path Request Path, like http://server-name:15672/rabbit/
	 * @param {*} params Request Params
	 */

	async sendRequest(method, path, params = {}) {
		return new Promise(async (resolve, reject) => {
			const options = {
				method,
				body: qs.stringify(params),
				form: true,
				json: true,
				url: `${this.protocol}://${this.username}:${this.password}@${this.hostname}/api/${path}${qs.stringify(params)}`
			}
			try {
				resolve(await request(options));
			} catch (e) {
				reject(e);
			}
		})
	}
}

module.exports = AmqpStats;