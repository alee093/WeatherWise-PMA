let history = [];

const addSearch = (data) => {
  history.unshift({
    id: Date.now(),
    ...data,
  });

  return history;
};

const getHistory = () => {
  return history;
};

const deleteItem = (id) => {
  history = history.filter((item) => item.id !== Number(id));
  return history;
};

module.exports = {
  addSearch,
  getHistory,
  deleteItem,
};