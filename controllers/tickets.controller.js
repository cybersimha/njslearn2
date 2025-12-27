const ticketService = require('../services/tickets.service');

async function createTicket(req, res) {
  const {
    name,
    email,
    subject,
    description,
    request_type,
    phone
  } = req.body;

  if (!name || !email || !subject || !description || !request_type) {
    return res.status(400).json({
      message: 'name, email, subject, description, request_type are required'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Invalid email format'
    });
  }

  const result = await ticketService.createTicket({
    name,
    email,
    phone,
    request_type,
    subject,
    description
  });

  return res.status(201).json(result);
}


async function getTicketById(req, res) {
  const result = await ticketService.getTicketById(req.params.id);
  if (!result) {
    return res.status(404).json({ message: 'Ticket not found' });
  }
  return res.status(200).json(result);
}

async function getAllTickets(req, res) {
   const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  const result = await ticketService.getAllTickets(page, limit);
  return res.status(200).json(result);
} 



async function addRepResponse(req, res) {
  const ticketId = req.params.id;
  const { repName, responseText, resolve } = req.body;

  if (!repName || !responseText) {
    return res.status(400).json({
      message: 'repName and responseText are required'
    });
  }

  const result = await ticketService.addRepResponse(
    ticketId,
    repName,
    responseText,
    resolve
  );

  if (!result) {
    return res.status(404).json({
      message: 'Ticket not found'
    });
  }

  return res.status(200).json({
    message: 'Response added successfully',
    status: result.status
  });
}

async function reopenTicket(req, res) {
  const ticketId = req.params.id;

  const result = await ticketService.reopenTicket(ticketId);

  if (!result) {
    return res.status(400).json({
      message: 'Ticket not found or not in RESOLVED state'
    });
  }

  return res.status(200).json({
    message: 'Ticket reopened successfully',
    status: 'OPEN'
  });
}



async function resolveTicket(req, res) {
  const ticketId = req.params.id;
  const { responseText } = req.body;

  if (!responseText) {
    return res.status(400).json({
      message: 'responseText is required'
    });
  }

  const result = await ticketService.updateTicketStatus(ticketId, 'RESOLVED');

  if (!result) {
    return res.status(404).json({
      message: 'Ticket not found'
    });
  }

  return res.status(200).json({
    message: 'Ticket resolved successfully'
  });
}

async function getTicketWithResponses(req, res) {
  const ticketId = req.params.id;

  const result = await ticketService.getTicketWithResponses(ticketId);

  if (!result) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  return res.status(200).json(result);
}

async function getTicketsByStatus(req, res) {
  const status = req.params.status || req.query.status;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  const result = await ticketService.getTicketsByStatus(status, page, limit);
  return res.status(200).json(result);
}

async function claimTicket(req, res) {
  const ticketId = req.params.id;
  const { repName } = req.body;

  if (!repName) {
    return res.status(400).json({ message: 'repName is required' });
  }

  const result = await ticketService.claimTicket(ticketId, repName);

  if (!result) {
    return res.status(404).json({ message: 'Ticket not found or not open' });
  }

  return res.status(200).json({ message: 'Ticket claimed successfully' });
}

module.exports = {
  createTicket,
  getTicketById,
  getAllTickets,
  addRepResponse,
  resolveTicket,
  reopenTicket,
  getTicketWithResponses,
  getTicketsByStatus,
  claimTicket 
};