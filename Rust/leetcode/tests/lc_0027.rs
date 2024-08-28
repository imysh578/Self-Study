use leetcode::problems::lc_0027_remove_element::*;

struct Input {
    nums: Vec<i32>,
    val: i32,
}

#[test]
fn ex1() {
    let mut input = Input {
        nums: vec![3, 2, 2, 3],
        val: 3,
    };
    let expected_output = 2;

    assert_eq!(remove_element(&mut input.nums, input.val), expected_output)
}

#[test]
fn ex2() {
    let mut input = Input {
        nums: vec![0, 1, 2, 2, 3, 0, 4, 2],
        val: 2,
    };
    let expected_output = 5;

    assert_eq!(remove_element(&mut input.nums, input.val), expected_output)
}
