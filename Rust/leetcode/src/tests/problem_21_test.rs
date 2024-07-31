// tests/problem1_test.rs
use leetcode_solutions::problems::problem1::{ListNode, Solution};

fn create_list(vals: &[i32]) -> Option<Box<ListNode>> {
    let mut current = None;
    for &val in vals.iter().rev() {
        let mut node = ListNode::new(val);
        node.next = current;
        current = Some(Box::new(node));
    }
    current
}

#[test]
fn test_merge_two_lists() {
    let list1 = create_list(&[1, 2, 4]);
    let list2 = create_list(&[1, 3, 4]);

    let merged_list = Solution::merge_two_lists(list1, list2);

    let expected_list = create_list(&[1, 1, 2, 3, 4, 4]);

    assert_eq!(merged_list, expected_list);
}
