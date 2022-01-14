interface ObjType {
  [index: string]: ObjType
}
/**
 * 前缀树
 *
 * @class Trie
 */
class Trie {
  root: ObjType = {};
  constructor() {

  }

  insert(word: string): void {
    let node = this.root;
    for (const st in node) {
      if (node[st]) {
        node[st] = {}
      } else {
        node = node[st]
      }
    }
  }

  search(word: string): boolean {

  }

  startsWith(prefix: string): boolean {

  }
}

/**
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/