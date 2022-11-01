import User from "../../types/User";

export const searchFilter = (users: User[], searchingText: string): User[] => {
  return [...users].filter(
    (user) =>
      user.name.includes(searchingText) ||
      String(user.phone).includes(searchingText) ||
      user.email.includes(searchingText)
  );
};

export const sortedData = (users: User[]) => {
  return users.sort((a, b) => {
    if (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase()) {
      return 1;
    }
    if (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) {
      return -1;
    }
    return 0;
  });
};
