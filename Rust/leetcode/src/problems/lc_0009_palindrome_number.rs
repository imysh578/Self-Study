pub fn is_palindrome(x: i32) -> bool {
    if x < 0 {
        return false;
    }

    let mut reversed_x = 0;
    let mut temp_value = x;

    while temp_value > 0 {
        reversed_x = reversed_x * 10 + temp_value % 10;
        temp_value /= 10;
    }

    x == reversed_x
}
