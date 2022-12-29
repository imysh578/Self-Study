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

Returning a slice would also work for a second_word function:
```rust
fn second_word(s:&String) -> &str {}
```