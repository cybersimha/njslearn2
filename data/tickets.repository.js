const pool = require('./db');

async function createTicket(ticketData) {
    const query = `  INSERT INTO tickets   (reference_id, name, email, phone, request_type, subject, description, status)  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;


    const [result] = await pool.execute(query, [
                        ticketData.reference_id, ticketData.name, ticketData.email,
                        ticketData.phone || null, ticketData.request_type, ticketData.subject,
                        ticketData.description, ticketData.status
                    ]);
    
    return {
        ...ticketData,
        id: result.insertId
    };
}

async function getTicketById(id) {
    const [rows] = await pool.execute(
    `SELECT * FROM tickets WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
}

async function getAllTickets( limit, offset) {
    const query = `SELECT * FROM tickets order by created_at desc LIMIT ${limit} OFFSET ${offset}`;
    console.log(query);
    const [rows] = await pool.execute(query);
    return rows;
}

async function updateTicketStatus(id, status) {
  const [result] = await pool.execute(
    `UPDATE tickets SET status = ? WHERE id = ?`,
    [status, id]
  );
  return result.affectedRows > 0;
}

async function resolveTicket(ticketId, responseText) {
  const query = `
    UPDATE tickets
    SET status = 'RESOLVED',
        response = ?,
        resolved_at = NOW()
    WHERE id = ? AND status = 'OPEN'
  `;

  const [result] = await pool.execute(query, [responseText, ticketId]);

  return result.affectedRows > 0;
}

async function getOpenTickets() {
   const [rows] = await pool.execute(
    `SELECT * FROM tickets WHERE status != 'RESOLVED' ORDER BY created_at ASC`
  );
  return rows;
}

async function getTicketsByStatus(status, limit, offset) {
  const query = `
    SELECT
      id,
      reference_id,
      name,
      request_type,
      status,
      created_at
    FROM tickets
    WHERE status = ?
    ORDER BY created_at ASC
    LIMIT ${limit} OFFSET ${offset} 
  `;

  const [rows] = await pool.execute(query, [status]);
  return rows;
}

async function countTicketsByStatus(status) {
  const [rows] = await pool.execute(
    `SELECT COUNT(*) AS total FROM tickets WHERE status = ?`,
    [status]
  );
  return rows[0].total;
}




module.exports = {
    createTicket,
    getTicketById,
    getAllTickets,
    updateTicketStatus,
    resolveTicket,
    getOpenTickets,
    getTicketsByStatus,
    countTicketsByStatus
};  