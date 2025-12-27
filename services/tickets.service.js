const ticketRepository = require('../data/tickets.repository');
const responseRepository = require('../data/ticketResponses.repository');

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

async function getTicketById(id) {
    return await ticketRepository.getTicketById(id);
}

async function getAllTickets(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return await ticketRepository.getAllTickets(limit, offset);
}

async function updateTicketStatus(ticketId, newStatus) {
    return await ticketRepository.updateTicketStatus(ticketId, newStatus);
}

async function addRepResponse(ticketId, repName, responseText, resolve = false) {
  const ticket = await ticketRepository.getTicketById(ticketId);

  if (!ticket || ticket.status === 'RESOLVED') {
                    return null;
            }


  // Add response to conversation
  await responseRepository.addResponse(
    ticketId,
    repName,
    responseText
  );

  // Update ticket status
  const newStatus = resolve ? 'RESOLVED' : 'IN_PROGRESS';
  await ticketRepository.updateTicketStatus(ticketId, newStatus);

  return { status: newStatus };
}

async function reopenTicket(ticketId) {
  const ticket = await ticketRepository.getTicketById(ticketId);

  if (!ticket || ticket.status !== 'RESOLVED') {
    return null;
  }

  await ticketRepository.updateTicketStatus(ticketId, 'OPEN');

  return true;
}

async function getTicketWithResponses(ticketId) {
  const ticket = await ticketRepository.getTicketById(ticketId);

  if (!ticket) {
    return null;
  }

  const responses = await responseRepository.getResponsesByTicketId(ticketId);

  return {
    ticket,
    responses
  };
}

async function getTicketsByStatus(status, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const [tickets, total] = await Promise.all([
    ticketRepository.getTicketsByStatus(status, limit, offset),
    ticketRepository.countTicketsByStatus(status)
  ]);

  return {
    data: tickets,
    meta: {
      total,
      page,
      limit
    }
  };
}



async function claimTicket(ticketId, repName) {
  const ticket = await ticketRepository.getTicketById(ticketId);

  if (!ticket || ticket.status !== 'OPEN') {
    return null;
  }

  // Move to IN_PROGRESS when claimed
  await ticketRepository.updateTicketStatus(ticketId, 'IN_PROGRESS');

  // Optional audit: record claim as a response entry
  await responseRepository.addResponse(
    ticketId,
    repName,
    'Ticket claimed by support representative'
  );

  return true;
}


module.exports = {
    createTicket,
    getTicketById,
    getAllTickets,
    updateTicketStatus,
    addRepResponse,
    reopenTicket,
    getTicketWithResponses,
    getTicketsByStatus,
    claimTicket  
};
