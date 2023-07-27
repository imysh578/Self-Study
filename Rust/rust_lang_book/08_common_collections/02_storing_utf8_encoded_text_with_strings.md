# Storing UTF-8 Encoded Text with Strings
## What is a String?
### String slice, `str`
- Rust has only one string type, which is the string slice `str`.
- String literals are stored in the program's binary, and are string slices which are references to some UTF-8 encoded string data stored elsewhere.

### Rust's standard library, `String`
- growable, mutable, owned, UTF-8 encoded string type

Both String and string slices are UTF-8 encoded.

## Creating a New String
### empty string
```rust
let mut s = String::new()
```

### with initial data
1. Using `to_string()` method
- which is available on any type that implements the `Display` trait, as string literals do.
```rust
let data = "initial contents";

let s = data.to_string();

// the method also works on a literal directly:
let s = "initial contents".to_string();
```

2. Using `String::from()` method
```rust
let s = String::from("initial contents");
```

`String::from` and `to_string` do the same thing, so which you choose is a matter of style and readability.

### UFT-8 encoded
```rust
    let hello = String::from("السلام عليكم");
    let hello = String::from("Dobrý den");
    let hello = String::from("Hello");
    let hello = String::from("שָׁלוֹם");
    let hello = String::from("नमस्ते");
    let hello = String::from("こんにちは");
    let hello = String::from("안녕하세요");
    let hello = String::from("你好");
    let hello = String::from("Olá");
    let hello = String::from("Здравствуйте");
    let hello = String::from("Hola");
```

## Updating a String

### Appending to a String with `push_str` and `push`
We can grow a `String` by using the `push_str` and `push`.

#### `push_str` method:
```rust
    let mut s = String::from("foo");
    s.push_str("bar");
```

It doesn't take ownership of the parameter
```rust
    let mut s1 = String::from("foo");
    let s2 = "bar";
    s1.push_str(s2);
    println!("s2 is {s2}");
```

#### `push` method:
```rust
    let mut s = String::from("lo");
    s.push('l');
```

#### Concatenation with the `+` Operator or the `format!` Macro
We can conveniently use the `+` operator or the `format!` macro to concatenate `String` values.

```rust
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2; // note s1 has been moved here and can no longer be used
```
The last statement actually takes ownership of s1, appends a copy of the contents of s2, and then returns ownership of the result. 


The `+` operator uses the `add` method, whose signature looks something like this:
```rust
fn add(self, s: &str) -> String {}
```

In this example, `&s2` is `&String` and the `add` function need `&str`. Why does it work?

The compiler can ***coerce*** the `&String` argument into a `&str`.
When we call the add method, Rust uses a ***deref coercion***, which here turns `&s2` into `&s2[..]`.

Concatenate multiple strings:
```rust
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");

    let s = s1 + "-" + &s2 + "-" + &s3; // tic-tac-toe
```

We can instead use the `format!` macro:
```rust
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");

    let s = format!("{s1}-{s2}-{s3}");`
```
In this case, it doesn't take ownership of any of its parameters.


> Test more cases:
> ```rust
>    let s4 = &s1 + s2; // invalid -> compile error
>    let s5 = &s1 + &s2; // invalid -> compile error
>    let s6 = s1 + s2; // invalid -> compile error
>```

## Indexing into Strings
Rust strings don't support indexing.
```rust
    let s1 = String::from("hello");
    let h = s1[0];
    // Compile error!
```
```shell
error[E0277]: the type `String` cannot be indexed by `{integer}`
 --> src/main.rs:3:13
  |
3 |     let h = s1[0];
  |             ^^^^^ `String` cannot be indexed by `{integer}`
  |
  = help: the trait `Index<{integer}>` is not implemented for `String`
  = help: the following other types implement trait `Index<Idx>`:
            <String as Index<RangeFrom<usize>>>
            <String as Index<RangeFull>>
            <String as Index<RangeInclusive<usize>>>
            <String as Index<RangeTo<usize>>>
            <String as Index<RangeToInclusive<usize>>>
            <String as Index<std::ops::Range<usize>>>
            <str as Index<I>>
```

### Internal Representation
A `String` is a wrapper over a `Vec<u8>`.
```rust
    let hello = String::from("Hola");
```
- In this case, `len` is 4, which means the vector storing the string "Hola" is 4 bytes long.

```rust
    let hello = String::from("Здравствуйте");
```
- “Здравствуйте” in UTF-8 is 24 bytes long, because each Unicode scalar value in that string takes 2 bytes of storage.

```rust
    let hello = "Здравствуйте";
    let answer = &hello[0];
    // Compile error!
```
- When encoded in UTF-8, `З` becomes two bytes: 208 and 151.
- So the `answer` would be 208, but 208 is not a valid character on its own.
- Rust doesn't compile this code to avoid returning an unexpected value and causing bugs that might not be discovered immediately.

### Bytes and Scalar Values and Grapheme Clusters! Oh My!
Another point about UTF-8 is that there are actually three relevant ways to look at strings from Rust's perspective:
1. bytes
2. scalar values
3. grapheme clusters(the closet thing to what we would call letters)


For example, Hindi word "नमस्ते"

It is stored as a vector of `u8` values:
```js
[224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164,
224, 165, 135]
```

Unicode scalar values(Rust's `char` type):
```js
['न', 'म', 'स', '्', 'त', 'े'] // fourth and sixth are not letters
```

grapheme clusters:
```js
["न", "म", "स्", "ते"]
```


Rust provides different ways of interpreting the raw string data that computers store so that each program can choose the interpretation it needs, no matter what human language the data is in.


## Slicing Strings
If we really need to use indices to create string slices, use `[]` with a range.
```rust
let hello = "Здравствуйте";

let s = &hello[0..4];
```

If we were to try to slice only part of a character's bytes with something like `&hello[0..1]`, Rust would panic at runtime.

## Methods for Iterating Over Strings
For individual Unicode scalar values, use the `chars()` method.
```rust
for c in "Зд".chars() {
    println!("{c}");
}
```

print:
```
З
д
```

Use bytes() to return each raw bytes: 
```rust
for b in "Зд".bytes() {
    println!("{b}");
}
```

print:
```
208
151
208
180
```


Getting grapheme clusters from strings as with the Devanagari script is complex, so this functionality is not provided by the standard library.

## Strings Are Not So Simple