// 128. 最长连续序列
// https://leetcode-cn.com/problems/longest-consecutive-sequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function (nums) {
    if(nums.length === 0){
        return 0 
    }
    nums.sort((a, b) => a - b)
    const dp = []
    dp[0] = 1
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] - nums[i - 1] === 1) {
            dp[i] = dp[i - 1] + 1
        } else if (nums[i] === nums[i - 1]) {
            dp[i] = dp[i - 1]
        } else {
            dp[i] = 1
        }
    }
    return Math.max(...dp)
};