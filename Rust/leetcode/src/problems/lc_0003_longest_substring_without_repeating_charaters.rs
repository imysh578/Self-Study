// pub fn length_of_longest_substring(s: String) -> i32 {
//     use std::cmp::max;
//     use std::collections::HashMap;
//
//     let mut map = HashMap::new();
//     let mut prev = 0;
//     let mut longest_length = 0;
//
//     for (curr, char) in s.chars().enumerate() {
//         let found_index = map.get(&char);
//
//         while found_index.is_some() && *found_index.unwrap() >= prev {
//             prev += 1;
//         }
//
//         longest_length = max(longest_length, curr as i32 - prev + 1);
//
//         map.insert(char, curr as i32);
//     }
//
//     longest_length
// }

pub fn length_of_longest_substring(s: String) -> i32 {
    use std::cmp::max;
    use std::collections::HashMap;

    let mut map = HashMap::new();
    let mut prev = -1;
    let mut longest_length = 0;

    for (curr, char) in s.chars().enumerate() {
        if let Some(found_index) = map.insert(char, curr as i32) {
            prev = max(prev, found_index);
        }

        longest_length = max(longest_length, curr as i32 - prev);
    }

    longest_length
}
