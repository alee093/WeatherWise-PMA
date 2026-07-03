const History = require("../models/History");

const addSearch = async (data) => {
  return await History.create(data);
};

const getHistory = async (clientId, filters = {}) => {
  const query = {
    clientId,
  };

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

const deleteItem = async (id, clientId) => {
  await History.findOneAndDelete({
    _id: id,
    clientId,
  });

  return {
    message: "Deleted successfully",
  };
};
const updateItem = async (id, clientId, data) => {
  const allowedFields = [
    "city",
    "country",
    "temperature",
    "humidity",
    "feelsLike",
    "wind",
    "pressure",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new Error("No valid fields to update");
  }

  const updated = await History.findOneAndUpdate(
    { _id: id, clientId },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new Error("Record not found");
  }

  return updated;
};

module.exports = {
  addSearch,
  getHistory,
  deleteItem,
  updateItem,
};