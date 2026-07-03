const historyService = require("../services/historyService");

const add = async (req, res) => {
  try {
    const history = await historyService.addSearch(req.body);

    res.status(201).json(history);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const history = await historyService.getHistory(req.query);

    res.json(history);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await historyService.deleteItem(req.params.id);

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  add,
  get,
  remove,
};