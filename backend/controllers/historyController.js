const historyService = require("../services/historyService");

const add = (req, res) => {
  const updated = historyService.addSearch(req.body);
  res.json(updated);
};

const get = (req, res) => {
  res.json(historyService.getHistory());
};

const remove = (req, res) => {
  const { id } = req.params;
  const updated = historyService.deleteItem(id);
  res.json(updated);
};

module.exports = {
  add,
  get,
  remove,
};