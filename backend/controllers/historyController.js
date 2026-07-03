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
    const clientId = req.headers["x-client-id"];

    const history = await historyService.getHistory(
      clientId,
      req.query
    );

    res.json(history);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const clientId = req.headers["x-client-id"];

    await historyService.deleteItem(
      req.params.id,
      clientId
    );

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const clientId = req.headers["x-client-id"];

    const updated = await historyService.updateItem(
      req.params.id,
      clientId,
      req.body
    );

    res.json(updated);
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
  update,
};