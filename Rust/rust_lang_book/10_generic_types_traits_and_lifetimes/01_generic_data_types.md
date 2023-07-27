# Generic Data Types

We use generics to create definitions for items like function signatures or structs, which we can then use with many different concrete data types.

## In Function Definitions

When defining a function that uses generics, we place the generics in the signature of the function where we would usually specify the data types of the parameters and return value.

- It makes our code more flexible and provides more functionality to callers of our function while preventing code duplication.

Continuing with the `largest` function, let's say we had two functions: one that finds the largest item in a slice of `i32` values and one that finds the largest item in a slice of `char` values.

```rust
fn largest_i32(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn largest_char(list: &[char]) -> &char {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest_i32(&number_list);
    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest_char(&char_list);
    println!("The largest char is {}", result);
}
```

Let's eliminate the duplication by introducing a generic type parameter in a single function.

To define the **_generic_** `largest` function, place type name declarations inside angle brackets(`<>`) like this:

```rust
fn largest<T>(list: &[T]) -> &T {
    //...
}
```

- Short for type, `T` is the default choice of most developers.

Let's create a generic function:

```rust
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest(&char_list);
    println!("The largest char is {}", result);
}

// Compile Error!
```

```shell
error[E0369]: binary operation `>` cannot be applied to type `&T`
 --> src/main.rs:5:17
  |
5 |         if item > largest {
  |            ---- ^ ------- &T
  |            |
  |            &T
  |
help: consider restricting type parameter `T`
  |
1 | fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T {
  |             ++++++++++++++++++++++

For more information about this error, try `rustc --explain E0369`.
error: could not compile `playground` due to previous error
```

- We want to compare values of type `T` in the body, but comparison doesn't work for all possible types that `T` could be.
- To enable comparisons, the standard library has the `std::cmp::PartialOrd` trait that we can implement on types.
- By following the help text's suggestion, we restrict the type valid for `T` to only those that implement `PartialOrd`. (In this case, the standard library implements `PartialOrd` on both `i32` and `char`)

## In Struct Definitions

We can also define structs to use a generic type parameter in on or more fields using the `< >` syntax

Example:

```rust
#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point{x: 5, y: 10};
    let float = Point{x: 1.0, y: 4.0};

    println!("{:#?}", integer);
    println!("{:#?}", float);
}
```

To define a `Point` struct where `x` and `y` have different types:

```rust
#[derive(Debug)]
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point{x: 5, y: 10};
    let both_float = Point{x: 1.0, y: 4.0};
    let integer_and_float = Point{x: 6, y: 4.0};

    println!("{:#?}", both_integer);
    println!("{:#?}", both_float);
    println!("{:#?}", integer_and_float);
}
```

## In Enum Definitions

```rust
enum Option<T> {
    Some(T),
    None,
}
```

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

## In Method Definitions

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
```

- Note that we have to declare `T` just after `impl` so we can use `T` to specify that we’re implementing methods on the type `Point<T>`.
- We could have chosen a different name for this generic parameter than the generic parameter declared in the struct definition, but using the same name is conventional.

We can also specify constraints on generic types when defining methods on the type.

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10 };
    let p2 = Point { x: 5.0, y: 10.0 };

    println!("p1.x = {}", p1.x());
    println!("p2.x = {}", p2.x());
    println!("p1.distance_from_origin = {}", p1.distance_from_origin()); // error! -> only f32 type can use `distance_from_origin` method
    println!("p2.distance_from_origin = {}", p2.distance_from_origin());
}
```

Generic type parameters in a struct definition can be different in the same struct's method signatures.

```rust
struct Point<X1, Y1> {
    x: X1,
    y: Y1,
}
impl<X1, Y1> Point<X1, Y1> {
    fn mixup<X2, Y2>(self, other: Point<X2, Y2>) -> Point<X1, Y2> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10.3 };
    let p2 = Point { x: "Hello", y: 'c' };

    let p3 = p1.mixup(p2);

    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
}
```

- The generic parameters `X1` and `Y1` are declared after `impl` because they go with the struct definition.
- The generic parameters `X2` and `Y2` are declared after `fn mixup`, because they’re only relevant to the method.

## Performance of Code Using Generics

Using generic types won't make your program run any slower than it would with concrete types.
Rust accomplishes this by performing **_monomorphization_** of the code using generics at compile time.
**_Monomorphization_** is the process of turning generic code into specific code by filling in the concrete types that are used when compiled.

Let’s look at how this works by using the standard library’s generic `Option<T>` enum:

```rust
fn main() {
    let integer = Some(5);
    let float = Some(5.0);
}
```

The monomorphized version of the code:

```rust
enum Option_i32 {
    Some(i32),
    None,
}

enum Option_f64 {
    Some(f64),
    None,
}

fn main() {
    let integer = Option_i32::Some(5);
    let float = Option_f64::Some(5.0);
}
```
- The generic `Option<T>` is replaced with the specific definitions created by the compiler. 

The process of ***monomorphization*** makes Rust’s generics extremely efficient at runtime.
