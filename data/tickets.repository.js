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

async function getTicketbyId(id) {
    const query = `SELECT * FROM tickets WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);

    if (rows.length === 0)
    {
        return null;
    }
    else{
        return rows[0];
    }   
}

async function getAllTickets( limit, offset) {
    const query = `SELECT * FROM tickets order by created_at desc LIMIT ${limit} OFFSET ${offset}`;
    const [rows] = await pool.execute(query);
    return rows;
}


module.exports = {
    createTicket,
    getTicketbyId,
    getAllTickets,
};  