// https://leetcode-cn.com/problems/jump-game/submissions/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var canJump = function (nums) {
    // let dp = []
    // dp[0] = true
    // for (let i = 1; i < nums.length; i++) {
    //     dp[i] = false
    //     let j = 0
    //     while (!dp[i] && j < i) {
    //         dp[i] = dp[j] && nums[j] >= i - j
    //         j++
    //     }
    // }
    // return dp[nums.length - 1]

    // let length = nums.length;
    // if (length == 1) return true;
    // let minStep = 1;        //定义一个数，为达到最后最后一个结点最小需要的步数
    // for (let i = length - 2; i > 0; i--) {          //从倒数第二个往第二个开始遍历
    //     if (nums[i] < minStep) {            // 如果当前元素的值小于最小步数,则到达最后一个元素的最小步数+1;
    //         minStep++;
    //     } else {
    //         minStep = 1;              //如果当前元素的值大于或等于最小步数，则一定能到达最后一个元素，
    //         // 此时可以就当前元素认为是最后一个元素，并对于前一个元素来说最小步数为1;
    //     }
    // }

    // return nums[0] >= minStep;

    let length = nums.length
    if (length === 1) {
        return true
    }
    let maxLength = 1
    for (let i = length - 2; i > 0; i--) {
        if (nums[i] < maxLength) {
            maxLength++
        } else {
            maxLength = 1
        }
    }
    return nums[0] >= maxLength
};