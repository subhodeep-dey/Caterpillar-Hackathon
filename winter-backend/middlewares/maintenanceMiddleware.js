module.exports = (req, res, next) => {
    res.status(503).json({ message: 'maintenance' });
  };