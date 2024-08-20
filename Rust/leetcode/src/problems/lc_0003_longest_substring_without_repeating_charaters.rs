pub fn length_of_longest_substring(s: String) -> i32 {
    use std::collections::HashMap;

    let mut map = HashMap::new();
    let mut map_counter = 0;
    let mut longest_length = 0;

    for c in s.chars() {
        match map.get(&c) {
            None => {
                map.insert(c, map_counter);
            }
            Some(_) => {
                let empty_map = HashMap::new();
                map = empty_map;
                map_counter = 0;
                map.insert(c, map_counter);
            }
        }
        map_counter += 1;

        if longest_length < map_counter {
            longest_length = map_counter;
        }
        println!("{:?}", map_counter);
        println!("{:?}", map);
    }

    if longest_length == 0 {
        longest_length = map_counter;
    }

    longest_length
}
