use leetcode::problems::lc_0021_merge_two_sorted_lists::*;

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
fn ex1() {
    let list1 = create_list(&[1, 2, 4]);
    let list2 = create_list(&[1, 3, 4]);

    let input = merge_two_lists(list1, list2);

    let expected_output = create_list(&[1, 1, 2, 3, 4, 4]);

    assert_eq!(input, expected_output);
}

#[test]
fn ex2() {
    let list1 = create_list(&[]);
    let list2 = create_list(&[]);

    let input = merge_two_lists(list1, list2);

    let expected_output = create_list(&[]);

    assert_eq!(input, expected_output);
}

#[test]
fn ex3() {
    let list1 = create_list(&[1, 2, 4]);
    let list2 = create_list(&[1, 3, 4, 5, 9]);

    let input = merge_two_lists(list1, list2);

    let expected_output = create_list(&[1, 1, 2, 3, 4, 4, 5, 9]);

    assert_eq!(input, expected_output);
}
