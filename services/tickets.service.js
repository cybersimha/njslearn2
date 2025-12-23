const ticketRepository = require('../data/tickets.repository');

async function createTicket(ticketData) {
    ticketData = processTicket(ticketData);
    return await ticketRepository.createTicket(ticketData);
}

function processTicket(ticketData) {
    // Business logic to process ticket can be added here
    const newTicket = {
        ...ticketData,
        reference_id: `TCKT-${Date.now()}`,
        status: 'OPEN'
    };

    return newTicket;
}

async function getTicketbyId(id) {
    return await ticketRepository.getTicketbyId(id);
}

async function getAllTickets(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return await ticketRepository.getAllTickets(limit, offset);
}

module.exports = {
    createTicket,
    getTicketbyId,
    getAllTickets,
};
