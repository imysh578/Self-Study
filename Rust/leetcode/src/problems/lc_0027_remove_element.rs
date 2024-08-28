pub fn remove_element(nums: &mut Vec<i32>, val: i32) -> i32 {
    let mut count = 0;

    for index in 0..nums.len() {
        println!("{:?}", nums);
        let num = nums[index];
        if num != val {
            nums[count] = num;
            count += 1;
            println!("{}", index);
        }
    }

    for _index in count..nums.len() {
        println!("{:?}", nums);
        nums.remove(count);
    }

    count as i32
}
