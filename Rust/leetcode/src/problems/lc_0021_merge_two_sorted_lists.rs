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

    pub fn from_vec(vec: &[i32]) -> Self {
        vec.sort();
        let mut test = Self::new(0);
        
        for num in vec {
            
        }
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
    //     (None, Some(list2)) => Some(list2),
    //     (Some(list1), None) => Some(list1),
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
    let mut result = Box::new(ListNode::new(0));
    let mut pointer = &mut result;

    while let (Some(node1), Some(node2)) = (list1, list2) {
        if node1.val < node2.val {
            pointer.next = node1;
            pointer = pointer.next;
            node1 = node1.next;
        } else {
            pointer.next = 
        }
    }

    None
}
