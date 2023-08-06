export const StorageService = {
  save(name, item) {
    try {
      localStorage.setItem(name, JSON.stringify(item));
    } catch (ignore) {
      // Do nothing
    }
  },

  load(name) {
    try {
      const value = localStorage.getItem(name);
      return value === null ? null : JSON.parse(value);
    } catch (ignore) {
      return null;
    }
  },
};
