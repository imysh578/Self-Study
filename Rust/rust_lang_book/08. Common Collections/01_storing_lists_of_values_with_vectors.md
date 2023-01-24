# Storing LIsts of Values with Vectors
- Vectors
  - `Vec<T>`
  - store more than one value in a single data structure that puts all the values next to each other in memory.
  - can only store values of the same type.
  - use generics(`<T>`).

- The standard Library of Vector: [link](https://doc.rust-lang.org/std/vec/struct.Vec.html)

## Creating a New Vector
### A new empty vector
```rust
let v: Vec<i32> = Vec::new();
```

### With initial values

```rust
let v = vec![1, 2, 3];
```
- Rust can infer that the type of `v` is `Vec<i32>`

## Updating a Vector
- `push` method: add elements to a vector
```rust
let mut v = Vec::new();

v.push(5);
v.push(6);
v.push(7);
v.push(8);
```
- We can make vectors mutable with `mut`

## Reading Elements of Vectors
There are two ways to reference a value stored in a vector:
1. indexing
2. using the `get` method

```rust
    let v = vec![1,2,3,4,5];

    let third: &i32 = &v[2];
    println!("The third element is {third}");

    let third: Option<&i32> = v.get(2);
    match third {
        Some(third) => println!("The third element is {third}"),
        None => println!("There is no third element."),
    }
```

### What happens if accessing an element beyond the range of the vector?
```rust
    let v = vec![1,2,3,4,5];

    let does_not_exist = &v[100]; // causes the program to panic
    let does_not_exist = &v.get(100); // returns None
```
- Indexing method: occurs panic
- `get` method: returns `None`


### Ownership and borrowing
- We can't have mutable and immutable reference in the same scope.
```rust
    let v = vec![1,2,3,4,5];

    let first = &v[0];

    v.push(6);

    println!("The first element is: {first}");

    // Compile error occurs!
```

```shell
error[E0502]: cannot borrow `v` as mutable because it is also borrowed as immutable
 --> src/main.rs:6:5
  |
4 |     let first = &v[0];
  |                  - immutable borrow occurs here
5 |
6 |     v.push(6);
  |     ^^^^^^^^^ mutable borrow occurs here
7 |
8 |     println!("The first element is: {first}");
  |                                      ----- immutable borrow later used here
```

This error is due to the way vectors work:
- Because vectors put the values next to each other in memory.
- Adding a new element onto the end of the vector might require allocating new memory and copying the old elements to the new space, if there isn't enough room to put all the elements next to each other where the vector is currently stored.

## Iterating over the Values in a Vector
### Read
```rust
    let v = vec![100, 32, 57];

    for i in &v {
        println!("{i}");
    }
```

### Update
To change the value that the mutable reference refers to, we have to use the `*` dereference operator.
```rust
    let mut v = vec![100, 32, 57];

    for i in &mut v {
        *i += 50;
    }
```

Iterating over a vector, whether immutably or mutably, is safe because of the borrow checker's rules.
```rust
    let mut v = vec![100, 32, 57];

    for i in &mut v {
        *i += 50;
        v.push(*i*100);
    }

// Compile error occurs!
```
```shell
error[E0499]: cannot borrow `v` as mutable more than once at a time
 --> src/main.rs:6:9
  |
4 |     for i in &mut v {
  |              ------
  |              |
  |              first mutable borrow occurs here
  |              first borrow later used here
5 |         *i += 50;
6 |         v.push(*i*100);
  |         ^^^^^^^^^^^^^^ second mutable borrow occurs here
```

## Using an Enum to Store Multiple Types
Vectors can only store values that are the same type.
We can use enums to store various types in vectors, because the variants of an enum are defined under the same enum type.

```rust
    #[derive(Debug)]
    enum SpreadsheetCell {
        Int(i32),
        Float(f64),
        Text(String),
    }

    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Text(String::from("blue")),
        SpreadsheetCell::Float(10.12),
    ];

    println!("{:?}", row);
```

## Dropping a Vector Drops Its Elements
```rust
    {
        let v = vec![1, 2, 3, 4];

        // do stuff with v
    } // <- v goes out of scope and is freed here
```