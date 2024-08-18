use leetcode::problems::lc_0026_remove_duplicates_from_sorted_array::*;

#[test]
fn ex1() {
    let mut input = vec![1, 1, 2];
    let expected_output = 2; // expected length of the array after removing duplicates
    let expected_array = vec![1, 2]; // expected array after removing duplicates

    let result = remove_duplicates(&mut input);

    assert_eq!(result, expected_output);
    assert_eq!(input, expected_array[..]);
}

#[test]
fn ex2() {
    let mut input = vec![0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    let expected_output = 5; // expected length of the array after removing duplicates
    let expected_array = vec![0, 1, 2, 3, 4]; // expected array after removing duplicates

    let result = remove_duplicates(&mut input);

    assert_eq!(result, expected_output);
    assert_eq!(input, expected_array[..]);
}
