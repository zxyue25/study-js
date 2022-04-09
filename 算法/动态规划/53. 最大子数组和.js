// 53. 最大子数组和
// https://leetcode-cn.com/problems/maximum-subarray/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // 自解
  // if(nums.length === 1){
  //     return nums[0]
  // }
  // let maxSum = nums[0]
  // for(let i = 0; i < nums.length; i++){
  //     let maxSumItem = nums[i]
  //     let totalSum = nums[i]
  //     for(let j = i+1; j < nums.length; j++){
  //         totalSum += nums[j]
  //         maxSumItem = Math.max(totalSum, maxSumItem)
  //     }
  //     maxSum = Math.max(maxSum, maxSumItem)
  // }
  // return maxSum

  // 动态规划
  let curMaxSub = 0;
  let maxSub = nums[0];
  nums.forEach((x) => {
    curMaxSub = Math.max(x + curMaxSub, x);
    maxSub = Math.max(maxSub, curMaxSub);
  });
  return maxSub;

  // 分治
};
