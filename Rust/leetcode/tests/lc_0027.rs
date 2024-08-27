use leetcode::problems::lc_0027_remove_element::*;

struct Input {
    nums: Vec<i32>,
    val: i32,
}

#[test]
fn ex1() {
    let input = Input {
        nums: vec![3, 2, 2, 3],
        val: 3,
    };
    let expected_output = 3;

    assert_eq!(remove_element(&mut input.nums, input.val), expected_output)
}
