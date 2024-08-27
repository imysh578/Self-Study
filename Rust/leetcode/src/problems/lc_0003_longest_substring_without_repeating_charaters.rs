pub fn length_of_longest_substring(s: String) -> i32 {
    use std::collections::HashMap;

    let mut current_map = HashMap::new();
    let mut longest_length = 0;
    for (index, char) in s.chars().enumerate() {
        current_map.insert(char, index as i32);
    }

    for (index, char) in s.chars().enumerate() {
        match current_map.get(&char) {
            None => {
                current_map.insert(char, index as i32);
            }
            Some(&start) => {
                println!("{:?}, {:?}", char, index);
                current_map.clear();

                for val in start..index as i32 {
                    current_map.insert(s.chars().nth(val as usize).unwrap(), val);
                }
            }
        }

        println!("{:?}", current_map);

        if longest_length < current_map.len() as i32 {
            longest_length = current_map.len() as i32;
        }
    }

    longest_length
}
