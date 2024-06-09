# The Slice Type
- a contiguous sequence of elements in a collection
- a kind of reference, so it does not have ownership

## Example Code (without Slice)
- `first_word` function
  - It takes a string of words separated by spaces and returns the first word of that string.
  - If there is no space in the string, the entire string should be returned.

- `as_byte`: convert *String* to *an array of bytes*
- `iter`: creates an iterator over the array of bytes and returns each element in a collection
- `enumerate`: wraps the result of `iter` and returns each element as part of a tuple (index, reference to the element)

```rust
fn first_word(s: &String) -> usize {
  let bytes = s.as_bytes();

  for (i, &item) in bytes.iter().enumerate() {
    if item == b' ' {
        return i;
    }
  }

  s.len()
}

fn main() {
  let mut s = String::from("hello world");

  let word = first_word(&s); // word will get the value 5

  s.clear(); // this empties the String, making it equal to ""

  // word still has the value 5 here, but there's no more string that
  // we could meaningfully use the value 5 with. word is now totally invalid!
}

```
- It returns a position of a space or the length of the string.
- It is separate value from the String, but only meaningful number in the context of the &String.
- After `s.clear()`, `word` is not meaningful at all.

- If we write a `second_word` function,
   - we need to track a starting and and ending index.
```rust
fn second_word(s: &String) -> (usize, usize) {}
```

## String Slices
- ***string slice***: a reference to part of a String.
- `[starting_index..ending_index]`
```rust
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];
```

![](https://doc.rust-lang.org/book/img/trpl04-06.svg)


- If the range starts at index 0, we can drop 0.
```rust
let s = String::from("hello");

let slice = &s[0..2];
let slice = &s[..2];
```

- If the slice includes the last byte of the String, we can drop the trailing number.
```rust
let s = String::from("hello");

let len = s.len();

let slice = &s[3..len];
let slice = &s[3..];
```

- We can also drop both values to take a slice of the entire string.
```rust
let s = String:: from("hello");

let len = s.len();

let slice = &s[0..len];
let slice = &s[..];
```

>NOTE
>String slice range indices must occur at valid UTF-8 character boundaries. 

Let's rewrite the `first_word` to return a slice.
```rust
fn first_word(s: &String) -> &str {
  let bytes = s.as_bytes();

  for (i, &item) in bytes.iter().enumerate() {
    if item == b' ' {
      return &s[0..i];
    }
  }

  &s[..]
}
```

Returning a slice would also work for a `second_word` function:
```rust
fn second_word(s:&String) -> &str {}
```


Using the slice version of `first_word` will throw a compile-time error:
```rust
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}

fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s); // immutable borrow occurs here

    s.clear(); // mutable borrow occurs here --> error!

    println!("the first word is: {}", word); // immutable borrow later used here
}

/* Compile-time Error! */
```

- `word` has an **immutable** reference from `first_word(&s)`. 
- `clear()` needs to truncate the `String`, so it needs to get a **mutable** reference.
- After `clear()`, `word`'s reference is not valid any more.

## String Literals as Slices
- string literals
  - stored inside the binary
  - `&str type; it's a slice pointing to that specific point of the binary.
  - immutable; `&str` is an immutable reference
```rust
let s = "Hello, World";
```

## String Slices as Parameters
- Let's improve `first_word` function's signature:
```rust
/* before */
fn first_word(s: &String) -> &str {}

/* after */
fn first_word(s: &str) -> &str {} // it is better because it allows us to use the same function on both &String values and &str values
```

<br>

- If we have a `string slice`, we can pass that directly.
- If we have a `String`, we can pass a slice of the String or a reference to the `String`.
- Defining a function to take a string slice instead of a reference to a `String` makes our API more general and useful without losing any functionality.

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}

fn main() {
    let my_string = String::from("hello world");

    // `first_word` works on slices of `String`s, whether partial or whole
    let word = first_word(&my_string[0..6]);
    let word = first_word(&my_string[..]);
    // `first_word` also works on references to `String`s, which are equivalent
    // to whole slices of `String`s
    let word = first_word(&my_string);

    let my_string_literal = "hello world";

    // `first_word` works on slices of string literals, whether partial or whole
    let word = first_word(&my_string_literal[0..6]);
    let word = first_word(&my_string_literal[..]);

    // Because string literals *are* string slices already,
    // this works too, without the slice syntax!
    let word = first_word(my_string_literal);
}
```

## Other Slices
### array slices
```rust
let a = [1, 2, 3, 4, 5];

let slice = &a[1..3]; // type &[i32]

assert_eq!(slice, &[2, 3]);
```

# Summary
- The concepts of ownership, borrowing, and slices ensure memory safety in Rust programs at compile time.
- You can control over your memory usage, but having the owner of data automatically clean up that data when the owner goes out of scope. -> don't have to write and debug extra code to get this control.



# Playground
```rs
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
```