/**
 * Remove every given number(permutation) in the array, until no elements are left.
 * Returns the list of elements that were removed in the initial array in the same order that they were removed.
 *
 * @param {json} req
 * @param {json} res
 * @return {json} Removed Items
 */
const clearArray = (req, res) => {
    const { array, permutation } = req.body;
    if (!array || !permutation) res.status(400).json("Array and Permutation are required");

    try {
        res.status(200).json({ 'removedItems': removeByPerm(array, permutation) });
    } catch (error) {
        res.status(500).json({ 'message': 'error' });
    }
}

/**
 * Clear By Permutation and Returns the list of elements that were removed
 *
 * @param {array} array
 * @param {number} permutation
 * @return {array} Removed Items
 */
const removeByPerm = (array, permutation) => {
    let removedItems = []
    let step = permutation - 1
    let targetIndex = 0
    while (array.length > 0) {
        targetIndex = targetIndex + step
        targetIndex = targetIndex > (array.length - 1) ? (targetIndex % array.length) : targetIndex;
        removedItems.push(array[targetIndex])
        array.splice(targetIndex, 1)
        console.log(array);
    }
    return removedItems;
}

module.exports = { clearArray }