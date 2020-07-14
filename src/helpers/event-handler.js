const events = require('events');
const eventEmitter = new events.EventEmitter();
const DomainEvents = require('../constants/domain-events');

module.exports = { eventEmitter, DomainEvents }