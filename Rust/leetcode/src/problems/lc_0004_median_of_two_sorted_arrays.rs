pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
    let mut merged_array = [nums1, nums2].concat();
    merged_array.sort();

    let quotient_by_two = merged_array.len() / 2;
    let remainder_by_two = merged_array.len() % 2;
    let is_even_len = remainder_by_two == 0;

    let mut result = 0.0;
    if is_even_len {
        result =
            (merged_array[quotient_by_two - 1] as f64 + merged_array[quotient_by_two] as f64) / 2.0;
    } else {
        result = merged_array[quotient_by_two] as f64;
    }

    result
}
