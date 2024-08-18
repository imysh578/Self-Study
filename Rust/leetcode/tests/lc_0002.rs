use leetcode::problems::lc_0002_add_two_numbers::*;

#[test]
fn ex1() {
    let list1 = ListNode::from_vec(&[2, 4, 3]);
    let list2 = ListNode::from_vec(&[5, 6, 4]);

    let expected_output = ListNode::from_vec(&[7, 0, 8]);
    assert_eq!(add_two_numbers(list1, list2), expected_output)
}

#[test]
fn ex2() {
    let list1 = ListNode::from_vec(&[0]);
    let list2 = ListNode::from_vec(&[0]);

    let expected_output = ListNode::from_vec(&[0]);
    assert_eq!(add_two_numbers(list1, list2), expected_output)
}

#[test]
fn ex3() {
    let list1 = ListNode::from_vec(&[9, 9, 9, 9, 9, 9, 9]);
    let list2 = ListNode::from_vec(&[9, 9, 9, 9]);

    let expected_output = ListNode::from_vec(&[8, 9, 9, 9, 0, 0, 0, 1]);
    assert_eq!(add_two_numbers(list1, list2), expected_output)
}
