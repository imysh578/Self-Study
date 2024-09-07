fn expand_around_center(s: &str, left: usize, right: usize) -> (usize, usize) {
    let s = s.as_bytes();
    let mut l = left;
    let mut r = right;

    while l > 0 && r < s.len() && s[l - 1] == s[r] {
        l -= 1;
        r += 1;
    }

    (l, r)
}

pub fn longest_palindrome(s: String) -> String {
    let len = s.len();

    if len <= 1 {
        return s;
    }

    let mut start = 0;
    let mut end = 0;

    for i in 0..len {
        let (l1, r1) = expand_around_center(&s, i, i);
        let (l2, r2) = expand_around_center(&s, i, i + 1);

        if r1 - l1 > end - start {
            start = l1;
            end = r1;
        }

        if r2 - l2 > end - start {
            start = l2;
            end = r2;
        }
    }

    s[start..end].to_string()
}
