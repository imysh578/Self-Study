pub fn length_of_longest_substring(s: String) -> i32 {
    use std::collections::HashMap;

    let mut current_map = HashMap::new();
    let mut longest_length = 0;

    for (index, char) in s.chars().enumerate() {
        match current_map.get(&char) {
            None => {
                current_map.insert(char, index as i32);
            }
            Some(&found_index) => {
                current_map.clear();

                for val in found_index + 1..=index as i32 {
                    println!("{}", val);
                    current_map.insert(s.chars().nth(val as usize).unwrap(), val);
                }
            }
        }

        if longest_length < current_map.len() as i32 {
            longest_length = current_map.len() as i32;
        }
    }

    longest_length
}
