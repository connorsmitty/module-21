const express = require('express');
const path = require('path');
const apiRoutes = require('./api');

const router = express.Router();

// Use the apiRoutes middleware
router.use('/api', apiRoutes);

// Serve up the React front-end in production
if (process.env.NODE_ENV === 'production') {
  router.use(express.static(path.join(__dirname, '../../client/build')));

  // Serve the index.html file for any unmatched routes
  router.use((req, res)  => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
}

module.exports = router;