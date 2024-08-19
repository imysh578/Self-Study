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
    let mut carry = 0;
    let mut pointer = &mut result;

    // let list1 = l1.clone();
    // let list2 = l2.clone();

    match (l1, l2) {
        (None, None) => None,
        (list1, None) => list1,
        (None, list2) => list2,
        (mut list1, mut list2) => {
            while list1.is_some() || list2.is_some() {
                let sum = carry
                    + list1.as_ref().map_or(0, |node| node.val)
                    + list2.as_ref().map_or(0, |node| node.val);

                carry = sum / 10;

                let new_node = Box::new(ListNode::new(sum % 10));

                pointer.next = Some(new_node);
                pointer = pointer.next.as_mut().unwrap();

                list1 = list1.and_then(|node| node.next);
                list2 = list2.and_then(|node| node.next);
            }

            result.next
        }
    }
}
