pub fn longest_palindrome(s: String) -> String {
    let mut longest = String::from("");
    let mut current = String::from("");
    let s_vec: Vec<char> = s.chars().collect();

    if s.len() < 2 {
        return s;
    }

    for i in 1..s.len() - 1 {
        let prev = s_vec[i - 1];
        let curr = s_vec[i];
        let next = s_vec[i + 1];

        if current.is_empty() {
            current = curr.to_string();
        }

        match prev == next {
            false => {
                // TODO:
            }
            true => {
                println!("i: {:?}", i);
                current = [prev.to_string(), current, next.to_string()].join("");
                println!("current: {:?}", current);
            }
        }

        if longest.len() < current.len() {
            longest = current.clone();
            current.clear();
        }
    }

    longest
}
