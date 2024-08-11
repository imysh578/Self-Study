// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    pub fn new(val: i32) -> Self {
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

pub fn merge_two_lists(
    list1: Option<Box<ListNode>>,
    list2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    /*
     * Method1. Using recursion
     */
    // match (list1, list2) {
    //     (None, None) => None,
    //     (None, Some(node2)) => Some(node2),
    //     (Some(node1), None) => Some(node1),
    //     (Some(mut node1), Some(mut node2)) => {
    //         if node1.val < node2.val {
    //             node1.next = merge_two_lists(node1.next, Some(node2));
    //             Some(node1)
    //         } else {
    //             node2.next = merge_two_lists(Some(node1), node2.next);
    //             Some(node2)
    //         }
    //     }
    // }

    /*
     * Method2.
     */
    // if list1.is_none() {
    //     return list2;
    // }
    //
    // if list2.is_none() {
    //     return list1;
    // }
    //
    // let mut result = ListNode::new(0);
    // let mut pointer = &mut result; // pointer for adding next node
    //
    // let mut l1 = list1;
    // let mut l2 = list2;
    //
    // while l1.is_some() && l2.is_some() {
    //     if l1.as_ref().unwrap().val <= l2.as_ref().unwrap().val {
    //         pointer.next = l1.take(); // pointer takes the ownership of l1, and l1 becomes None
    //         pointer = pointer.next.as_mut().unwrap(); // set pointer as mutable reference to l1
    //                                                  // => change the pointer to next node
    //         l1 = pointer.next.take(); // set l1 as next node and pointer.next becomes None
    //     } else {
    //         pointer.next = l2.take();
    //         pointer = pointer.next.as_mut().unwrap();
    //         l2 = pointer.next.take();
    //     }
    // }
    //
    // if l1.is_some() {
    //     pointer.next = l1.take();
    // }
    // if l2.is_some() {
    //     pointer.next = l2.take();
    // }
    //
    // result.next

    /*
     * Method3
     */
    let mut result = ListNode::new(0);
    let pointer = &mut result;

    let mut l1 = list1.clone();
    let mut l2 = list2.clone();

    while let (Some(node1), Some(node2)) = (l1.as_mut(), l2.as_mut()) {
        if node1.val < node2.val {
            let next = node1.next.take();
            pointer.next = l1.take();
            l1 = next;
        } else {
            let next = node2.next.take();
            pointer.next = l2.take();
            l2 = next;
        }
    }

    if l1.is_some() {
        pointer.next = l1;
    }

    if l2.is_some() {
        pointer.next = l2;
    }

    result.next
}
