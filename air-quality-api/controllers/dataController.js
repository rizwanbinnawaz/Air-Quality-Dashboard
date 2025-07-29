const Record = require('../models/Record');


// GET /api/data/all
exports.getAllData = async (req, res) => {
  try {
    const data = await Record.find({}).sort({ datetime: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET /api/data/parameter/:parameter
exports.getDataByParameter = async (req, res) => {
  const { parameter } = req.params;

  const allowed = ['co', 'nmhc', 'benzene', 'nox', 'no2'];
  if (!allowed.includes(parameter)) {
    return res.status(400).json({ error: "Invalid parameter." });
  }

  try {
    const data = await Record.find({}, { datetime: 1, [parameter]: 1, _id: 0 }).sort({ datetime: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/data/range?from=...&to=...
exports.getDataByDateRange = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "Missing 'from' or 'to' query params" });
  }

  try {
    const data = await Record.find({
      datetime: {
        $gte: new Date(from),
        $lte: new Date(to)
      }
    }).sort({ datetime: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE /api/data/clear
exports.clearRecords = async (req, res) => {
  try {
    const result = await Record.deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} records.` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete records.' });
  }
};