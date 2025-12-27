const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/tickets.controller');

router.post('/', ticketController.createTicket);

router.get('/', ticketController.getAllTickets);

router.get('/status/:status', ticketController.getTicketsByStatus);

router.get('/:id/details', ticketController.getTicketWithResponses);

router.put('/:id/resolve', ticketController.resolveTicket);

router.put('/:id/reopen', ticketController.reopenTicket);

router.post('/:id/respond', ticketController.addRepResponse);


router.put('/:id/claim', ticketController.claimTicket);

router.get('/:id', ticketController.getTicketById);

module.exports = router;
