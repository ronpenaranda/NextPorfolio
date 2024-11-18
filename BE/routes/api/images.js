const router = require('express').Router();
const path = require('path');

router.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../images', filename);
  
    res.sendFile(filePath, err => {
      if (err) {
        res.status(404).json({ message: 'Image not found!' });
      }
    });
  });


module.exports = router;