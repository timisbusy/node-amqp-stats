
const AmqpStats = require('../index');

class Test {
    constructor() {
        this.Rabbit = new AmqpStats({
            username: 'username',
            password: 'password',
            hostname: 'hostname/rabbit',
            protocol: 'https'
        });
    }

    async overview() {
        const overview = await this.Rabbit.overview()
        console.log(overview)
    }

    async connections() {
        const connections = await this.Rabbit.connections();
        console.log(connections);
    }
}

const TestV1 = new Test();
TestV1.connections();
TestV1.overview();