const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/tickets.controller')

router.post('/', ticketController.createTicket );

router.get('/:id', ticketController.getTicketById);

router.get('/', ticketController.getAllTickets );

module.exports = router;
