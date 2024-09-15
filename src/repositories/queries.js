function addRowLockOnFlights (flightId) {
    return `SELECT * FROM flights where Flights.id = ${flightId} FOR UPDATE`;
}

module.exports = {
    addRowLockOnFlights,
};