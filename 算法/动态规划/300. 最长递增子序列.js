// 300. 最长递增子序列
// https://leetcode-cn.com/problems/longest-increasing-subsequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // let maxLength = 1
  let dp = [];
  dp[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    // maxLength = Math.max(maxLength, dp[i])
  }
  return Math.max(...dp);
};
