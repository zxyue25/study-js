// https://leetcode-cn.com/problems/container-with-most-water/
// 11. 盛最多水的容器
var maxArea = function (height) {
  // 双指针
  let left = 0;
  let right = height.length - 1;
  let minHeight = 0;
  let area = 0;
  while (left < right) {
    minHeight = Math.min(height[left], height[right]);
    area = Math.max(area, (right - left) * minHeight);
    if (height[left] > height[right]) {
      right--;
    } else {
      left++;
    }
  }
  return area;
};
