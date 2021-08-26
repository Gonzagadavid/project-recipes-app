class localStorageMock {
  constructor() {
    this.storage = {};
  }

  getItem(key) {
    return JSON.stringify(this.storage[key]);
  }

  setItem(key, item) {
    this.storage[key] = JSON.parse(item);
  }
}

export default localStorageMock;
