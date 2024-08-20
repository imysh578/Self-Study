use leetcode::problems::lc_0003_longest_substring_without_repeating_charaters::*;

#[test]
fn ex1() {
    let input = String::from("abcabcbb");
    let expected_output = 3;

    assert_eq!(length_of_longest_substring(input), expected_output)
}

#[test]
fn ex2() {
    let input = String::from("bbbbb");
    let expected_output = 1;

    assert_eq!(length_of_longest_substring(input), expected_output)
}

#[test]
fn ex3() {
    let input = String::from("pwwkew");
    let expected_output = 3;

    assert_eq!(length_of_longest_substring(input), expected_output)
}

#[test]
fn ex4() {
    let input = String::from(" ");
    let expected_output = 1;

    assert_eq!(length_of_longest_substring(input), expected_output)
}

#[test]
fn ex5() {
    let input = String::from("aab");
    let expected_output = 2;

    assert_eq!(length_of_longest_substring(input), expected_output)
}

#[test]
fn ex6() {
    let input = String::from("dvdf");
    let expected_output = 3;

    assert_eq!(length_of_longest_substring(input), expected_output)
}
