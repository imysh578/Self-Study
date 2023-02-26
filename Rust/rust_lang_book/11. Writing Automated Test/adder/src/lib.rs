fn divide(x: i32, y: i32) -> Result<i32, &'static str> {
    if y == 0 {
        return Err("division by zero");
    }
    Ok(x / y)
}

#[test]
fn test_divide() {
    assert_eq!(divide(4, 2), Ok(2));
    assert!(divide(4, 0).is_err());
}
