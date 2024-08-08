use leetcode::problems::lc_0021_merge_two_sorted_lists::*;

#[test]
fn ex1() {
    let list1 = ListNode::from_vec(&[1, 2, 4]);
    let list2 = ListNode::from_vec(&[1, 3, 4]);

    let input = merge_two_lists(list1, list2);

    let expected_output = ListNode::from_vec(&[1, 1, 2, 3, 4, 4]);

    assert_eq!(input, expected_output);
}

#[test]
fn ex2() {
    let list1 = ListNode::from_vec(&[]);
    let list2 = ListNode::from_vec(&[]);

    let input = merge_two_lists(list1, list2);

    let expected_output = ListNode::from_vec(&[]);

    assert_eq!(input, expected_output);
}

#[test]
fn ex3() {
    let list1 = ListNode::from_vec(&[1, 2, 4]);
    let list2 = ListNode::from_vec(&[1, 3, 4, 5, 9]);

    let input = merge_two_lists(list1, list2);

    let expected_output = ListNode::from_vec(&[1, 1, 2, 3, 4, 4, 5, 9]);

    assert_eq!(input, expected_output);
}
