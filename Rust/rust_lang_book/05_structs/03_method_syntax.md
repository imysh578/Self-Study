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
- `rect1.width`: field
- `rect1.width()`: method

<br>

- Rust does not implement *getters* automatically for struct fields.
- Getters are useful to make the field private but the method public. Thus enable read-only access to that field as part of the type's public API.

> NOTE: Where is `->` operation?
> -  In C and C++,
> - `.`: calling a method on the object directly
> - `->`: calling the method on a pointer to the object and need to dereference the pointer first; if object is pointer, `object->something()` is similar to `(*objet).something()`.
> <br>
> - In Rust,
> - doesn't have `->` operation
> - ***automatic referencing and dereferencing***: when we call a method with `object.something()`, Rust automatically adds in `&`, `&mut`, or `*`.
> - In other words, the following are the same:
> ```rust
> p1.distance(&p2);
> (&p1).distance(&p2);
> ```

## Methods with More Parameters
```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
}
```
- Methods can take multiple parameters after `self` parameter.
- And those parameters work just like parameters in functions.

## Associated Functions
- ***associated functions***: all functions defined within an `impl` block
- We can define associated functions that don't have `self` as their first parameter. (e.g., `String::from`) -> Thus they are **not method**!
- Associated functions without `self` are often used for constructors that will return a new instance of the struct.

```rust
impl Rectangle {
  fn square(size: u32) -> Self {
    Self {
      width: size,
      height: size,
    }
  }
}
```
- `Self`: aliases for the type that appears after the `impl` keyword; (e.g., `Rectangle`)
- To call this associated functions, we use the `::` syntax with the struct name (e.g., `let sq = Rectangle::square(3);`)
- `::` syntax: used for both associated functions and namespaces created by modules.

## Multiple impl Blocks
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

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
}
```

# Playground
```rs
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

struct RGBColor(u8, u8, u8);

fn main() {
    // Structs
    let mut user1 = User {
        username: String::from("someone"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
        active: true,
    };

    user1.username = String::from("new name");

    println!("User1: {}", user1.username);
    println!("{} {} {}", user1.email, user1.sign_in_count, user1.active);


    let mut user2 = User {
        email: String::from("anyone@example.com"),
        ..user1
    };

    user2.username = String::from("any user name");

    println!("User2: {}", user2.username);
    println!("{} {} {}", user2.email, user2.sign_in_count, user2.active);



    // Tuple Structs
    let black = RGBColor(0, 0, 0);
    println!("Black: {} {} {}", black.0, black.1, black.2);


    // functions with structs
    print!("Area without struct: {}", area_without_struct(30, 50));

    let rect = (30, 50);
    println!("Area with tuple struct: {}", area_tuple_struct(rect));
    
    let rect = Rectangle {
        width: 30,
        height: 50,
    };
    println!("Area with struct: {}", area_struct(&rect));

    // struct methods (`impl`)
    println!("Area with method: {}", rect.area());
    println!("Length with method: {}", rect.len());

    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    println!("rect1 can hold rect2: {}", rect.can_hold(&rect2));

    let square = Rectangle::square(10);
    println!("Square: {:?}", square);
}


fn area_without_struct(width: u32, height: u32) -> u32 {
    width * height
}

fn area_tuple_struct(dimensions: (u32, u32)) -> u32 {
    dimensions.0 * dimensions.1
}

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn area_struct(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}

impl Rectangle {
    // `self` is a reference to the instance of the struct
    // `Self` is the type of the struct

    // methods
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn len(&self) -> u32 {
        2 * (self.width + self.height)
    }

    // methods with multiple parameters
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    // associated functions
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}
```