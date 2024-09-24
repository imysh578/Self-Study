use leetcode::problems::lc_0006_zigzag_conversion::*;

struct Input {
    s: String,
    num_rows: i32,
}

#[test]
fn ex1() {
    let input = Input {
        s: String::from("PAYPALISHIRING"),
        num_rows: 3,
    };
    let expected_output = String::from("PAHNAPLSIIGYIR");

    assert_eq!(convert(input.s, input.num_rows), expected_output);
}

#[test]
fn ex2() {
    let input = Input {
        s: String::from("PAYPALISHIRING"),
        num_rows: 4,
    };
    let expected_output = String::from("PINALSIGYAHRPI");

    assert_eq!(convert(input.s, input.num_rows), expected_output);
}

#[test]
fn ex3() {
    let input = Input {
        s: String::from("A"),
        num_rows: 1,
    };
    let expected_output = String::from("A");

    assert_eq!(convert(input.s, input.num_rows), expected_output);
}
