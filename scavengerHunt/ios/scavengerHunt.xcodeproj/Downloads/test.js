/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    var result = [];

    var recurse = function(node) {
        console.log(node)
        if (!node) {
            return;
        }
        result.push(node.val);
        console.log(result);

        if (node.left) {
            recurse(node.left);
        }
        
        if (node.right) {
            recurse(node.right);
        }
    };
    
    recurse(root);
    
    result = result.sort(function(a, b){
        return a - b;
    });
    
    return result[k-1]
};

console.log(kthSmallest({
    val: 1,
    left: null,
    right: null,
}, 1))