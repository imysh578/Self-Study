// fn expand_around_center(s: &str, left: usize, right: usize) -> (usize, usize) {
//     let s = s.as_bytes();
//     let mut l = left;
//     let mut r = right;
//
//     while l > 0 && r < s.len() && s[l - 1] == s[r] {
//         l -= 1;
//         r += 1;
//     }
//
//     (l, r)
// }
//
// pub fn longest_palindrome(s: String) -> String {
//     let len = s.len();
//
//     if len <= 1 {
//         return s;
//     }
//
//     let mut start = 0;
//     let mut end = 0;
//
//     for i in 0..len {
//         let (l1, r1) = expand_around_center(&s, i, i);
//         let (l2, r2) = expand_around_center(&s, i, i + 1);
//
//         if r1 - l1 > end - start {
//             start = l1;
//             end = r1;
//         }
//
//         if r2 - l2 > end - start {
//             start = l2;
//             end = r2;
//         }
//     }
//
//     s[start..end].to_string()
// }

pub fn get_longest_palindrome_around_center(
    s: &String,
    left_center: usize,
    right_center: usize,
) -> (usize, usize) {
    let bytes = s.as_bytes();

    let (mut left, mut right) = (left_center, right_center);

    while left > 0 && right < bytes.len() && bytes[left - 1] == bytes[right] {
        left -= 1;
        right += 1;
    }

    (left, right)
}

pub fn longest_palindrome(s: String) -> String {
    println!("s: {}", s);
    let length = s.len();

    if length <= 1 {
        return s;
    }

    let (mut start, mut end) = (0, 0);

    for i in 0..length {
        println!("###### i: {}", i);
        let (even_left, even_right) = get_longest_palindrome_around_center(&s, i, i);
        println!("Even Left: {}, Even Right: {}", even_left, even_right);
        println!("Even: {}", s[even_left..even_right].to_string());
        let (odd_left, odd_right) = get_longest_palindrome_around_center(&s, i, i + 1);
        println!("Odd Left: {}, Odd Right: {}", odd_left, odd_right);
        println!("Odd: {}", s[odd_left..odd_right].to_string());

        let longest_length = end - start;
        let even_length = odd_right - odd_left;
        let odd_length = even_right - even_left;

        if even_length > longest_length {
            start = odd_left;
            end = odd_right;
        }

        if odd_length > longest_length {
            start = even_left;
            end = even_right;
        }

        println!("#{}. Longest so far: {}", i, s[start..end].to_string());
    }

    s[start..end].to_string()
}
