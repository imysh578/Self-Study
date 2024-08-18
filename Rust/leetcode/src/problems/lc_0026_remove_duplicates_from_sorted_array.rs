pub fn remove_duplicates(nums: &mut Vec<i32>) -> i32 {
    if nums.is_empty() {
        return 0;
    }

    let mut pointer = 0;

    for i in 1..nums.len() {
        if nums[i] > nums[pointer] {
            pointer += 1;
            nums[pointer] = nums[i];
        } else {
            nums[i] = 0;
        }
    }

    (pointer + 1) as i32
}
