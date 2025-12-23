const ticketService = require('../services/tickets.service');

async function createTicket(req, res) {
  console.log('Request Body:', req.body);
  const result = await ticketService.createTicket(req.body);
  res.status(201).json(result);
}

async function getTicketById(req, res) {
  const result = await ticketService.getTicketbyId(req.params.id);
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

module.exports = {
  createTicket,
  getTicketById,
  getAllTickets,
};