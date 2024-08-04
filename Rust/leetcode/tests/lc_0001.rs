use leetcode::problems::lc_0001_two_sum::*;

struct Input {
    nums: Vec<i32>,
    target: i32,
}

#[test]
fn ex1() {
    let input = Input {
        nums: vec![2, 7, 11, 15],
        target: 9,
    };
    let expected_output = vec![0, 1];
    assert_eq!(two_sum(input.nums, input.target), expected_output)
}

#[test]
fn ex2() {
    let input = Input {
        nums: vec![3, 2, 4],
        target: 6,
    };
    let expected_output = vec![1, 2];
    assert_eq!(two_sum(input.nums, input.target), expected_output)
}

#[test]
fn ex3() {
    let input = Input {
        nums: vec![3, 3],
        target: 6,
    };
    let expected_output = vec![0, 1];
    assert_eq!(two_sum(input.nums, input.target), expected_output)
}
