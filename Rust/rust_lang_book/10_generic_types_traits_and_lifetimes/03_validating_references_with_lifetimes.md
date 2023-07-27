# Validating References with Lifetimes
Every reference in Rust has a ***lifetime***.
**Lifetimes**
- are another kind of generic that we've already been using.
- ensure that references are valid as long as we need them to be.
- are implicit and inferred in most of the time.

## Preventing Dangling References with Lifetimes
The main aim of lifetimes is to prevent ***dangling references***.

Example:
```rust
fn main() {
    let r;

    {
        let x = 5;
        r = &x;
    } // `x` is gone out of scope!

    println!("r: {}", r);
}

// Compile Error!
```
- The value `r` is referring to has gone out of scope.

Result:
```shell
error[E0597]: `x` does not live long enough
 --> src/main.rs:6:13
  |
6 |         r = &x;
  |             ^^ borrowed value does not live long enough
7 |     }
  |     - `x` dropped here while still borrowed
8 |
9 |     println!("r: {}", r);
  |                       - borrow later used here
```

## The Borrow Checker
The Rust compiler has a ***borrow checker*** that compares scopes to determine whether all borrows are valid.

Example of Dangling reference:
```rust
fn main() {
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {}", r); //          |
}                         // ---------+

// Compile Error!
```
- `'a`: lifetime of `r`
- `'b`: lifetime of `x`

Fixed one:
```rust
fn main() {
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {}", r); //   |       |
                          // --+       |
}                         // ----------+
```
- The data has a longer lifetime than the reference

## Generic Lifetimes in Functions
Example code:
- `longest` function: has two `str` input parameters and compare their length to return longer one.
```rust
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}

fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

// Compile Error!
```
- We doesn't know the concrete lifetimes of the references that will be passed in.
- To fix this error, add generic lifetime parameters that define the relationship between the references so the borrow checker can perform its analysis.

## Lifetime Annotation Syntax
**Lifetime annotations** 
- don’t change how long any of the references live. 
- rather describe the relationships of the lifetimes of multiple references to each other without affecting the lifetimes.

**Lifetime annotation syntax**
- apostrophe (`'`) + the name of lifetime parameter => (e.g., `'a`)
- the names of lifetime parameters: usually all lowercase and very short

We place the lifetime annotations after `&` of a reference
```rust
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

## Lifetime Annotations in Functions signatures
```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```
- `<'a>`: declare the generic *lifetime* parameters
- add `'a` to each references
- It means that 
    - both parameters live at least as long as lifetime `'a`.
    - the string slice returned from the function will live at least as long as lifetime `'a`
- the generic lifetime `'a` will get the concrete lifetime that is equal to the smaller of the lifetimes of `x` and `y`

Note that the `longest` function doesn’t need to know exactly how long `x` and `y` will live, only that some scope can be substituted for `'a` that will satisfy this signature.

Example Code:
```rust
fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {}", result);
}

// Compiler Error!
```
- As humans, we can look at this code and see that `string1` is longer than `string2` and therefore `result` will contain a reference to `string1`. 
- However, the compiler can’t see that the reference is valid in this case.

## Thinking in Terms of Lifetimes
We don't need to specify a lifetime of parameter that doesn't have any relationship with other parameter.
Example code:
```rust
fn longest<'a>(x: &'a str, y: &str) -> &'a str {
    x
}
```

If the returned value lifetime is note related to the lifetime of the parameters at all, the compile error occurs.
Example code:
```rust
fn longest<'a>(x: &str, y: &str) -> &'a str {
    let result = String::from("really long string");
    result.as_str()
}
```
- In this case, `'a` refers `result` which means that it gets cleaned up at the end of this function.
- To fix this, return an owned data type rather than a reference.

## Lifetime Annotations in Struct Definitions
We can define structs to hold references, but in that case we would need to add a lifetime annotation on every reference in the struct’s definition.

Example Code:
```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().expect("Could not find a '.'");
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}
```
- This annotation means an instance of `ImportantExcerpt` can’t outlive the reference it holds in its `part` field.

## Lifetime Elision
Lifetime can be inferred in particular situations.
- These situations were predictable and followed a few deterministic patterns.

Example Code:
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
```

***lifetime elision rules***: The patterns programmed into Rust’s analysis of references
**input lifetimes**: Lifetimes on function or method parameters
**output lifetimes**: Lifetimes on return values

The compiler uses **three rules** to figure out the lifetimes of the references when there aren’t explicit annotations.
1. The compiler assigns a lifetime parameter to each parameter that’s a reference.
    - a function with one parameter gets one lifetime parameter: `fn foo<'a>(x: &'a i32);`
    - a function with two parameters gets two separate lifetime parameters: `fn foo<'a, 'b>(x: &'a i32, y: &'b i32);`
    - ...
2. If there is exactly one input lifetime parameter, that lifetime is assigned to all output lifetime parameters
    - `fn foo<'a>(x: &'a i32) -> &'a i32`
3. If there are multiple input lifetime parameters, but one of them is `&self` or `&mut self` because this is a method, the lifetime of `self` is assigned to all output lifetime parameters.



## Lifetime Annotations in Method Definitions
Example Code
- `level` method whose only parameter is a reference to `self` and whose return value is an `i32`, which is not a reference to anything:
```rust
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

Here is an example where the third lifetime elision rule applies:
```rust
impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
```

## The Static Lifetime
`'static`: denotes that the affected reference can live for the entire duration of the program

```rust
let s: &'static str = "I have a static lifetime.";
```
- The text of this string is stored directly in the program’s binary, which is always available.

You might see suggestions to use the `'static` lifetime in error messages.
- Most of the time, these error messages results from attempting to create a dangling reference or a mismatch of the available lifetimes. => try fixing those problems, not specifying the 'static lifetime.

## Generic Type Parameters, Trait Bounds, and Lifetimes Together
```rust
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```