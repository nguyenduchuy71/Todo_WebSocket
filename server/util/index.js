// Generates a random string
const fetchID = () => Math.random().toString(36).substring(2, 10);

module.exports = { fetchID };
