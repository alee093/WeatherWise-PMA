import { v4 as uuid } from "uuid";

const STORAGE_KEY = "weatherwise-client-id";

export const getClientId = () => {
  let clientId = localStorage.getItem(STORAGE_KEY);

  if (!clientId) {
    clientId = uuid();
    localStorage.setItem(STORAGE_KEY, clientId);
  }

  return clientId;
};