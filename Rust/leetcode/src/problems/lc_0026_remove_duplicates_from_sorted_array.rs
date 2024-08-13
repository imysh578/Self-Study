pub fn remove_duplicates(nums: &mut Vec<i32>) -> i32 {
    let mut pointer = 0;
    let mut current_num = 0;

    for &mut num in &mut *nums {
        if num > current_num {
            nums[pointer] = num;
            pointer += 1;
            current_num = num;
        }
    }
    0
}
