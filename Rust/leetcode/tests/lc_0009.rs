use leetcode::problems::lc_0009_palindrome_number::*;

#[test]
fn ex1() {
    let input = 121;
    let expected_output = true;

    assert_eq!(is_palindrome(input), expected_output)
}

#[test]
fn ex2() {
    let input = -121;
    let expected_output = false;

    assert_eq!(is_palindrome(input), expected_output)
}

#[test]
fn ex3() {
    let input = 10;
    let expected_output = false;

    assert_eq!(is_palindrome(input), expected_output)
}
