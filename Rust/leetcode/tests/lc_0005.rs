use leetcode::problems::lc_0005_longest_palindromic_substring::*;

#[test]
fn ex1() {
    let input = "babad".to_string();
    let expected_output = "bab".to_string();

    assert_eq!(longest_palindrome(input), expected_output);
}

#[test]
fn ex2() {
    let input = "cbbd".to_string();
    let expected_output = "bb".to_string();

    assert_eq!(longest_palindrome(input), expected_output);
}

#[test]
fn ex3() {
    let input = "aaaa".to_string();
    let expected_output = "aaaa".to_string();

    assert_eq!(longest_palindrome(input), expected_output);
}

#[test]
fn ex4() {
    let input = "aabbaa".to_string();
    let expected_output = "aabbaa".to_string();

    assert_eq!(longest_palindrome(input), expected_output);
}
