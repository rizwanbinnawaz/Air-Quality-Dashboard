const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/parameter/:parameter', dataController.getDataByParameter);
router.delete('/clear', dataController.clearRecords);
router.get('/range', dataController.getDataByDateRange);
router.get('/all', dataController.getAllData);

module.exports = router;
