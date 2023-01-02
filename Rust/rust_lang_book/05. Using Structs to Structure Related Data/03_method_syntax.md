# Method Syntax
Methods are similar to functions:
  - declare with the `fn` keyword and a name.
  - can have parameters and a return value.
  - contain some code that's run when the method is called from somewhere else.

Unlike functions:
  - methods are defined within the context of a struct(or an enum or a trait object)
  - first parameter is always `self`, which represents the instance of the struct the method is being called on.

## Defining Methods
```rust
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

impl Rectangle {
  fn area(&self) -> u32 {
    self.width * self.height
  }
}

fn main() {
  let rect1 = Rectangle {
    width: 30,
    height: 50,
  };

  println!(
    "The area of the rectangle is {} square pixels.",
    rect1.area()
  );
}
```
- `impl Rectangle`
  - associated with the `Rectangle` type
  - move the `area` function within the `impl`
  - use `&self` instead of `rectangle: Rectangle` 

<br>

- `&self` is short for `self: &Self`
- Within an `impl` block, the type `Self` is an alias for the type that the `impl` block is for.
- Methods ***MUST*** have a parameter named self of type `Self` for the first parameter.
- Methods can take ownership, so we need to add `&` in front of `self` to borrow it.
- It is rare to use just `self`; this technique is usually used when the method transforms `self` into something else and you want to prevent the caller from using the original instance after the transformation.

Note that it is allowed to give a method the same name as one of the struct's fields:
```rust
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

impl Rectangle {
  fn width(&self) -> bool {
    self.width > 0
  }
}

fn main() {
  let rect1 = Rectangle {
    width: 30,
    height: 50,
  };

  if rect1.width() {
    println!("The rectangle has a nonzero width; it is {}", rect1.width);
  }
}

```

## 