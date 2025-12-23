function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({
        message: 'An error occurred while processing your request'
    });
}

module.exports = errorHandler;
