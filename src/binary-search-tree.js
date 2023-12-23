const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode
      return;
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    if (!this.rootNode) return false;
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else if (data === currentNode.data) {
        return true;
      }
    }
    return false;
  }

  find(data) {
    if (!this.rootNode) return null;
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else if (data === currentNode.data) {
        return currentNode;
      }
    }
    return null;
  }

  remove(data) {
    if (!this.rootNode) return null;
    this.rootNode = this._deleteNode(this.rootNode, data);
  }

  _deleteNode(currentNode, data) {
    if (data < currentNode.data) {
      currentNode.left = this._deleteNode(currentNode.left, data);
    } else if (data > currentNode.data) {
      currentNode.right = this._deleteNode(currentNode.right, data);
    } else {
      if (!currentNode.left) {
        return currentNode.right;
      } else if (!currentNode.right) {
        return currentNode.left;
      }

      currentNode.data = this._findMinData(currentNode.right);
      currentNode.right = this._deleteNode(currentNode.right, currentNode.data);
    }
    return currentNode;
  }

  _findMinData(currentNode) {
    let minData = currentNode.data;
    while (currentNode.left) {
      minData = currentNode.left.data;
      currentNode = currentNode.left;
    }
    return minData;
  }

  min() {
    let currentNode = this.rootNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};