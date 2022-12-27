# References and Borrowing

- When using functions, it is annoying to take and return ownership.
- Instead transferring ownership, we can provide a reference to the *String* value.

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

- **reference**
  - ampersand(`&`) 
  - allow us to use the value without taking ownership


<img width="744" alt="image" src="https://user-images.githubusercontent.com/33863016/209639948-a1c86fe8-c4ce-41fc-a5bd-ebbf8ee5386c.png">

> NOTE
> - dereferencing : The opposite of referencing
> - `*`: dereference operator

- ***borrowing***
  - the action of creating a reference


### What if modify something we're borrowing?

```rust
fn main() {
    let s = String::from("hello");

    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world");
}

/* Compile occurs at compile time. */
```

- Reference is immutable by default

## 1. Mutable References
- To modify reference,
  - declare the `s` as `mut`
  - add `mut` after `&`, so that it would be `&mut s`

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

- Mutable references have one big restriction:
  - cannot borrow more than once at a time
  - preventing multiple mutable references to the same data at the same time

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &mut s;
    let r2 = &mut s;

    println!("{}, {}", r1, r2);
}

/* Compile occurs at compile time. */
```
- This restriction prevent data races at compile time.
> NOTE: **data races**
A data race is similar to a race condition and happens when these three behaviors occur:
> - Two or more pointers access the same data at the same time.
> - At least one of the pointers is being used to write to the data.
> - There's no mechanism being used to synchronize access to the data.
>
> Data races cause undefined behavior and can be difficult to diagnose and fix when you're trying to track them down at runtime.


- Creates a new scope using curly brackets to allow for multiple mutable references

```rust
fn main() {
    let mut s = String::from("hello");

    {
        let r1 = &mut s;
    } // r1 goes out of scope here, so we can make a new reference with no problems.

    let r2 = &mut s;
}
```

- Also cannot have a mutable reference while we have an immutable one to the same value.

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    let r3 = &mut s; // BIG PROBLEM

    println!("{}, {}, and {}", r1, r2, r3);
}

/* Compile occurs at compile time. */
```

- reference's scope starts from where it is introduced and continues through the last time that reference is used.

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    println!("{} and {}", r1, r2);
    // variables r1 and r2 will not be used after this point

    let r3 = &mut s; // no problem
    println!("{}", r3);
}
```

- These scopes don't overlap, so this code is allowed.


## 2. Dangling References
- ***dangling pointer***
  - a pointer that references a location in memory that may have been given to someone else.
- In Rust, the complier guarantees that references will NEVER be dangling references: if you have a reference to some data, the complier will ensure that the data will not go out of scope before the reference to the data does.

```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String { // dangle returns a reference to a String

    let s = String::from("hello"); // s is a new String

    &s // we return a reference to the String, s
} // Here, s goes out of scope, and is dropped. Its memory goes away.
  // Danger!


/* Compile occurs at compile time. */
```

- The solution is to return the **String** directly:

```rust
fn main() {
    let string = no_dangle();
}

fn no_dangle() -> String {
    let s = String::from("hello");

    s
}
```

## 3. The Rules of References
- At any given time, you can have either one mutable reference or any number of immutable references.
- References must always be valid.
