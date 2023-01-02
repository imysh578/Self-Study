# An Example Program Using Structs
Let's write a program that calculates the area of a rectangle.

## Step 1. Create a new cargo project
- Create a new Cargo project: `cargo new rectangle`
- Write a code:
```rust
fn main() {
  let width1 = 30;
  let height1 = 50;

  println!(
    "The area of the rectangle is {} square pixels.",
    area(width1, height1)
  );
}

fn area(width: u32, height: u32) -> u32 {
  width * height
}
```
- Run this program: `cargo run`

This code works well. But it has two parameters, and it's not clear anywhere in our program that the parameters are related.

It would be more readable and more manageable to group width and height together.

## Step 2. Refactoring with Tuples
```rust
fn main() {
  let rect1 = (30, 50);

  println!(
    "The area of the rectangle is {} square pixels.",
    area(rect1)
  )
}

fn area(dimensions: (u32, u32)) -> u32 {
  dimensions.0 * dimensions.1
}
```
This version is better, but it is less clear: Tuples don't name their elements. So it is hard to figure width and height.

## Step 3. Refactoring with Structs: Adding More Meaning
Transform the tuple into a struct.
```rust
struct Rectangle {
  width: u32,
  height: u32,
}

fn main() {
  let rect1 = Rectangle {
    width: 30,
    height:50,
  };

  println!(
    "The area of the rectangle is {} square pixels.",
    area(&rect1)
  )
}

fn area(rectangle: &Rectangle) -> u32 { // immutable borrow of a struct Rectangle instance
  rectangle.width * rectangle.height
}
```

## Step 4. Adding Useful Functionality with Derived Traits
It would be useful to print an instance of `Rectangle` for debugging.

But, `println!` macro doesn't work to print the struct.

```rust
struct Rectangle {
  width: u32,
  height: u32,
}

fn main() {
  let rect1 = Rectangle {
    width: 30,
    height: 50,
  };

  println!("rect1 is {}", rect1);
}

/* Compile error occurs! */
```

- `println!` macro can print many kinds of formatting, and by default, it uses ***Display*** formatting: output intended for direct end user consumption.
- The primitive types implement ***Display*** by default.
- But with structs, the output format is less clear: print with comma? or curly bracket? all the fields be shown? ...
- To prevent this ambiguity, structs don't have a provided implementation of ***Display***

<br>

- `println!("{:?}")`: Putting `:?` inside the curly brackets makes output format as ***Debug***
- ***Debug*** trait enables us to print structs.
- To implement the trait for structs, add the outer attribute `#[derive(Debug)]` just before the struct definition.
```rust
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

fn main() {
  let rect1 = Rectangle {
    width: 30,
    height: 50,
  };

  println!("rect1 is {:?}", rect1);
}
```

```text
rect1 is Rectangle { width: 30, height: 50 }
```

It looks good enough.
But if you want to make it more readable, use `{:#?}`.
```rust
println!("rect1 is {:#?}", rect1);
```

```text
rect1 is Rectangle {
    width: 30,
    height: 50,
}
```

Another way to print out the Debug format is to use the `dbg!` macro
- `dbg!` macro takes ownership of an expression.

> NOTE
> - `dbg!`: standard error console stream(***stderr***)
> - `println!`: standard output console stream(***stdout***)

```rust
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

fn main() {
  let scale = 2;
  let rect1 = Rectangle {
    width: dbg!(30 * scale),
    height: 50,
  };

  dbg!(&rect1);
}
```

```text
[src/main.rs:10] 30 * scale = 60
[src/main.rs:16] &rect1 = Rectangle {
    width: 60,
    height: 50,
}
```

- We can put `dbg!` around the expression, because `dbg!` returns ownership of the expression's value.
- `derive`: add useful behavior to our custom types.