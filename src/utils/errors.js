export const handleError = (res, error) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation error', details: error.errors });
  }
  res.status(500).json({ error: 'Internal server error' });
};
