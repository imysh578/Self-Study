use leetcode::problems::lc_0007_reverse_integer::*;

#[test]
fn ex1() {
    let input = 123;
    let expected_output = 321;

    assert_eq!(reverse(input), expected_output);
}

#[test]
fn ex2() {
    let input = -123;
    let expected_output = -321;

    assert_eq!(reverse(input), expected_output);
}

#[test]
fn ex3() {
    let input = 120;
    let expected_output = 21;

    assert_eq!(reverse(input), expected_output);
}
