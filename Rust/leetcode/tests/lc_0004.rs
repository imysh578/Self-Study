use leetcode::problems::lc_0004_median_of_two_sorted_arrays::*;

struct Input {
    nums1: Vec<i32>,
    nums2: Vec<i32>,
}

#[test]
fn ex1() {
    let input = Input {
        nums1: vec![1, 3],
        nums2: vec![2],
    };
    let expected_output = 2.00000;

    assert_eq!(
        find_median_sorted_arrays(input.nums1, input.nums2),
        expected_output
    )
}

#[test]
fn ex2() {
    let input = Input {
        nums1: vec![1, 2],
        nums2: vec![3, 4],
    };
    let expected_output = 2.50000;

    assert_eq!(
        find_median_sorted_arrays(input.nums1, input.nums2),
        expected_output
    )
}
