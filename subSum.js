const arr = [2, 3, 4, 5, 7, 8, 5, 3, 6];
const target = 20;
let count = 0;

// arr.sort((a, b) => b - a);
function subSum(arr, t, memo = {}) {
  count++;
  const cur = arr[0];
  const index = `${arr.length} ${t}`;
  let result = [0, []];
  // console.log({ count });

  if (memo[index]) {
    result = memo[index];
  } else if (t <= 0 || arr.length < 1) {
    result = [0, []];
  } else if (cur > t) {
    result = subSum(arr.slice(1), t, memo);
  } else {
    const [ifS, arIs] = subSum(arr.slice(1), t - cur, memo);
    const [ifNs, arIns] = subSum(arr.slice(1), t, memo);
    if (ifS + cur == t) {
      result = [ifS + cur, [...arIs, cur]];
    } else {
      result = [ifNs, arIns];
    }
  }
  memo[index] = result;
  return result;
}

console.log({ t: subSum(arr, target), count });
