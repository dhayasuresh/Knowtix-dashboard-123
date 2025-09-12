const users = [];

export const registerUser = (username, password) => {
  const exists = users.find((user) => user.username === username);
  if (exists) return false;
  users.push({ username, password });
  return true;
};

export const loginUser = (username, password) => {
  return users.find((user) => user.username === username && user.password === password);
};
