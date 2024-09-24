pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
    let mut merged_array = Vec::new();

    let (mut nums1_counter, mut nums2_counter) = (0, 0);

    while nums1.len() > nums1_counter && nums2.len() > nums2_counter {
        if nums1[nums1_counter] < nums2[nums2_counter] {
            merged_array.push(nums1[nums1_counter]);
            nums1_counter += 1;
        } else {
            merged_array.push(nums2[nums2_counter]);
            nums2_counter += 1;
        }
    }

    while nums1.len() > nums1_counter {
        merged_array.push(nums1[nums1_counter]);
        nums1_counter += 1;
    }
    while nums2.len() > nums2_counter {
        merged_array.push(nums2[nums2_counter]);
        nums2_counter += 1;
    }

    let quotient_by_two = merged_array.len() / 2;
    let remainder_by_two = merged_array.len() % 2;
    let is_even_len = remainder_by_two == 0;

    let result: f64;
    if is_even_len {
        result =
            (merged_array[quotient_by_two - 1] as f64 + merged_array[quotient_by_two] as f64) / 2.0;
    } else {
        result = merged_array[quotient_by_two] as f64;
    }

    result
}
