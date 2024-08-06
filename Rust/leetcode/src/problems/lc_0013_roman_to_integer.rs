pub fn roman_to_int(s: String) -> i32 {
    let mut result = 0;
    let mut prev = 0;

    for c in s.chars().rev() {
        let current = match c {
            'I' => 1,
            'V' => 5,
            'X' => 10,
            'L' => 50,
            'C' => 100,
            'D' => 500,
            'M' => 1000,
            _ => 0,
        };

        result += if prev > current { -current } else { current };
        prev = current;
    }

    result
}
