const History = require("../models/History");

const addSearch = async (data) => {
  return await History.create(data);
};

const getHistory = async (filters = {}) => {
  const query = {};

  if (filters.city) {
    query.city = {
      $regex: filters.city,
      $options: "i",
    };
  }

  if (filters.from || filters.to) {
    query.createdAt = {};

    if (filters.from) {
      query.createdAt.$gte = new Date(filters.from);
    }

    if (filters.to) {
      const endDate = new Date(filters.to);
      endDate.setHours(23, 59, 59, 999);
      query.createdAt.$lte = endDate;
    }
  }

  return await History.find(query).sort({
    createdAt: -1,
  });
};

const deleteItem = async (id) => {
  await History.findByIdAndDelete(id);

  return {
    message: "Deleted successfully",
  };
};

module.exports = {
  addSearch,
  getHistory,
  deleteItem,
};