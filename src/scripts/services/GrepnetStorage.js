export class GrepnetStorage {
  static save(name, item) {
    try {
      localStorage.setItem(name, JSON.stringify(item));
    } catch (ignore) {
      // Do nothing
    }
  }

  static load(name) {
    try {
      const value = localStorage.getItem(name);
      return value === null ? null : JSON.parse(value);
    } catch (ignore) {
      return null;
    }
  }
}
