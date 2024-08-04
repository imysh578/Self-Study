use std::collections::HashMap;

pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // NOTE: The below method has O(n^2) complexity
    //
    // for i in 0..nums.len() - 1 {
    //     for j in i + 1..nums.len() {
    //         if nums[i] + nums[j] == target {
    //             return vec![i.try_into().unwrap(), j.try_into().unwrap()];
    //         }
    //     }
    // }
    // vec![]

    /*
     * NOTE: Using HashMap to decrease complexity to O(n)
     * Vector
     * - Structure: dynamic array that stores elements in contiguous memory blocks.
     * - Access Time: Accessing elements via index has a time complexity of O(1).
     * - Search Time: Finding a specific value takes O(n) time.
     * - Purpose: Useful for sequentially storing data and for quick index access.
     * Hashmap
     * - Structure: stores key-value pairs, using a hash function internally to store data.
     * - Access Time: On average, the time to find or insert a value via a key is O(1).
     * - Search Time: On average, the time to find a specific key is also O(1).
     * - Purpose: Useful for scenarios requiring fast lookup, insertion, and deletion, particularly when frequent key-based data retrieval is needed.
     */

    let mut map = HashMap::new();

    for (i, &num) in nums.iter().enumerate() {
        let complement = target - num;

        /* NOTE:
         * if let
         * - The if let statement works by checking if a variant of an enum matches a specific value and, if it does, extracting that value.
         * - It is used to match a value of an enum type with a specific pattern such as Option or Result
         * - It cannot be used with primitive types.
         */
        if let Some(&index) = map.get(&complement) {
            return vec![index as i32, i as i32];
        }
        map.insert(num, i);
    }
    vec![]
}
