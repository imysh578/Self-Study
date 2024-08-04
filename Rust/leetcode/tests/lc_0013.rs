use leetcode::problems::lc_0013_roman_to_integer::*;

#[test]
fn ex1() {
    let input = "III".to_string();
    let expected_output = 3;

    assert_eq!(roman_to_int(input), expected_output)
}

#[test]
fn ex2() {
    let input = "LVIII".to_string();
    let expected_output = 58;

    assert_eq!(roman_to_int(input), expected_output)
}

#[test]
fn ex3() {
    let input = "MCMXCIV".to_string();
    let expected_output = 1994;

    assert_eq!(roman_to_int(input), expected_output)
}
