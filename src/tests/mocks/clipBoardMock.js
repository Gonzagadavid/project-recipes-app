class ClipBoardMock {
  constructor() {
    this.data = 'default';
  }

  copy(item) {
    this.data = item;
  }

  paste() {
    return this.data;
  }
}

export default ClipBoardMock;
