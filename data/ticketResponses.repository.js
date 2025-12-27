const pool = require('./db');

async function addResponse(ticketId, repName, responseText) {
  const query = `
    INSERT INTO ticket_responses
    (ticket_id, rep_name, response_text)
    VALUES (?, ?, ?)
  `;

  const [result] = await pool.execute(query, [
    ticketId,
    repName,
    responseText
  ]);

  return { id: result.insertId };
}

async function getResponsesByTicketId(ticketId) {
  const [rows] = await pool.execute(
    `SELECT * FROM ticket_responses
     WHERE ticket_id = ?
     ORDER BY created_at ASC`,
    [ticketId]
  );
  return rows;
}

module.exports = {
  addResponse,
  getResponsesByTicketId
};
