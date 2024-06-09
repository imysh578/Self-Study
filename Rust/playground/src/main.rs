use std::str;

fn main() {
    // slice: a reference to a contiguous sequence of elements in a collection
    let s = String::from("hello world");
    let len = s.len();

    let hello = &s[0..5];
    let world = &s[6..len];
    println!("{} {}", hello, world);

    let hello2 = &s[..5];
    let world2 = &s[6..];
    println!("{} {}", hello2, world2);

    let hello_world = &s[..];
    println!("{}", hello_world);

    let s = String::from("hello world");
    let first_word_index = first_word(&s);
    println!("{}", first_word_index);
}

fn first_word(s: &String) -> usize {
    let bytes = s.as_bytes();
    println!("{:?}", bytes);
    println!("{:?}", str::from_utf8(bytes));

    for (i, &item) in bytes.iter().enumerate() {
        println!("{} {}", i, item);
        if item == b' ' {
            return i;
        }
    }

    s.len()
}