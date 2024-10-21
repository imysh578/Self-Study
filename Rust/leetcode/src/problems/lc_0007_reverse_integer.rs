pub fn reverse(x: i32) -> i32 {
    if x < i32::pow(-2, 31) && x > i32::pow(2, 31) - 1 {
        return 0;
    }

    let mut x = x;

    let mut is_negative = false;

    if x < 0 {
        x *= -1;
        is_negative = true;
    }

    let mut result = 0;

    while x > 0 {
        let remain = x % 10;
        result *= 10;
        result += remain;
        x /= 10;
    }

    if is_negative {
        result *= -1;
    }

    return result;
}
