# Defining an Enum
- Enums give us a way of saying a value is one of a possible set of values.
- Example: IP address can be either a V4 or V6, but not both at the same time.
```rust
enum IpAddrKind {
  V4,
  V6
}
```

## 1. Enum Values
Create instances of each of two variants of `IpAddrKind`:
```rust
let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
```

Define a function that takes `IpAddrKind`:
```rust
fn route(ip_kind: IpAddrKind) {}
```

Call this function:
```rust
route(IpAddrKind::V4);
route(IpAddrKind::V6);
```

It represents only what kind it is, but doesn't store IP address data.
Let's store data.

- Method1: Using struct 
```rust
enum IpAddrKind {
    V4,
    V6
}

struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

let home = IpAddr {
    kind: IpAddrKind::V4,
    address: String::from("127.0.0.1"),
}

let loopback = IpAddr {
    kind: IpAddrKind::V6,
    address: String::from("::1"),
}
```

- Method2: Only enum
```rust
enum IpAddr {
    V4(String),
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));
```

- Method3: Only enum, but different type for variants
```rust
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));
```

Standard Library for IP address
- [Link](https://doc.rust-lang.org/std/net/enum.IpAddr.html)
- Analysis of this:
```rust
struct Ipv4Addr {
    // --snip--
}

struct Ipv6Addr {
    // --snip--
}

enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}
```
- We can put any kind of data inside of an enum variant: strings, numeric types, struct or even another enum.


Other Example:
```rust 
enum Message {
    Quit,
    Move {x: i32, y: i32},
    Write(String),
    ChangeColor(i32, i32, i32),
}
```
- `Quit`: no data
- `Move`: has named fields like a struct does
- `Write`: single **String**
- `ChangeColor`: three **i32** values

If we used structs, each struct have their own type.
So it's hard to define a function to take all of them.
```rust
struct QuitMessage; // unit struct
struct MoveMessage {
    x: i32,
    y: i32,
}
struct WriteMessage(String); // tuple struct
struct ChangeColorMessage(i32, i32, i32); // tuple struct
```

Using `impl` to define methods on enums:
```rust
impl Message {
  fn call(&self)  {
    // method body would be defined here
  }
}

let m = Message::Write(String::from("Hello"));
m.call();
```
- `self`: get the enum's value

## 2. The Option Enum and Its Advantages Over Null Values
### Null Feature
***Null*** is a value that means there is no value in there.

> NOTE: ***"Null References: The Billion Dollar Mistake"***
Tony Hoare, the inventor of null, called it his billion-dollar mistake. 
He was designing the first comprehensive type system for references in an object-oriented language. 
His goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the complier.
But, he couldn't resist to put in a null reference, because it is easy to implement.
This led to innumerable errors, vulnerabilities, and system crashes in the last 40 years.

- The problem with null values is, if we try to use a null value as a not-null value, we'll get the error of some kind. 
- The Concept of null: a null is a value that is currently invalid or absent for some reason.
- The problem isn't really with the concept, but with the particular implementation.

### Option Enum
- Option Type encodes the very common scenario in which a value could be something or it could be nothing.

Rust doesn't have ***null*** feature, but it does have an enum that can encode the concept of a value being present or absent: This enum is ***Option<T>***.

```rust
enum Option<T> {
    None,
    Some(T),
}
```
- It is included in the prelude; don't need to bring it into scope explicitly. 
- We can use `Some` and `None` directly without the `Option::` prefix,.
- <T> syntax: a generic type parameter


```rust
    let some_number = Some(5); // Option<i32>
    let some_char = Some('e'); // Option<char>

    let absent_number: Option<i32> = None;
```
- When we have Some value, the value is present and Rust can infer the type of it.
  - Rust infer type of `some_number` and `some_char`
- When we have None Value, it is like same thing as null: We must tell what type it is.
  - `absent_number`: Its type is `Option<i32>`, but has a `None` value.

`Option<T>` and `T` are different type.
We can't use `Option<T>` value as if it were definitely a valid value.
```rust
    let x: i8 = 5;
    let y: Option<i8> = Some(5);

    let sum = x + y; // no implementation for i8 + Option<i8>

    // Compile error occurs!
```

In other words, we have to convert an `Option<T>` to a `T` before performing `T` operation with it.
This helps catch one of the most common issues with null.
- In order to have a value that can possibly be null, we must explicitly opt in by making the type of the value `Option<T>`. Then when we use this value, we are required to explicitly handle the case when the value is null.
- Everywhere that a value has a type that isn't an `Option<T>`, we can safely assume that the value isn't null.

For more information of  `Option<T>`'s methods: [Docs](https://doc.rust-lang.org/std/option/enum.Option.html)
