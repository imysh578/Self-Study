#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }

    pub fn from_vec(vec: &[i32]) -> Option<Box<ListNode>> {
        let mut result_list = None;
        for &num in vec.iter().rev() {
            let mut next_node = Self::new(num);
            next_node.next = result_list;
            result_list = Some(Box::new(next_node));
        }

        result_list
    }
}

pub fn add_two_numbers(
    l1: Option<Box<ListNode>>,
    l2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    let mut result = ListNode::new(0);
    let mut current = &mut result;

    // let list1 = l1.clone();
    // let list2 = l2.clone();

    match (l1, l2) {
        (None, None) => None,
        (list1, None) => list1,
        (None, list2) => list2,
        (mut list1, mut list2) => {
            while let (Some(node1), Some(node2)) = (list1.as_ref(), list2.as_ref()) {
                let mut sum = current.val + node1.val + node2.val;

                if sum >= 10 {
                    current.val = sum % 10;
                    current.next = ListNode::new(1);
                } else {
                    current.val = sum;
                    current.next = ListNode::new(0)
                }

                current = current.next;
            }

            result.next
        }
    }
}
