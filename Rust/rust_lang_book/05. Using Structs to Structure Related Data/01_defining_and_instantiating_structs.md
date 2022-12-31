# Defining and Instantiating Structs
- Structs are similar to tuples.
- The pieces of a struct can be different types.
- ***fields***: names and types of the pieces of data inside curly bracket; `key: value`
- We don't have to rely on the order of the data to specify or access the values of an instance.

<br>

- Example:
```rust
struct User {
  active: bool,
  username: String,
  email: String,
  sign_in_count: u64,
}

fn main() {
  let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
  };
}
```

- To get a specific value from a struct, we use dot notation. (e.g., `user1.email`)
- If the instance is mutable, we can change the value by using dot notation and assigning into a particular filed.
```rust 
let mut user1 = User {
  email: String::from("someone@example.com"),
  username: String::from("someusername123"),
  active: true,
  sign_in_count: 1,
}

user1.email = String::from("anotheremail@example.com");
```

>NOTE: The entire instance must be mutable; Marking only certain fields as mutable is not allowed.

- We can construct a new instance of the struct as the last expression in the function body to return that new instance.
```rust
fn build_user(email: String, username: String) -> User {
  User {
    email: email,
    username: username,
    active: true,
    sign_in_count: 1,
  }
}
```

## Using the Fields Init Shorthand
- If the struct field names and the parameter names are exactly the same, we can use field init ***shorthand syntax***; doesn't have the repetition.
```rust
fn build_user(email: String, username: String) -> User {
  User {
    email,
    username,
    active: true,
    sign_in_count: 1,
  }
}
```

## Creating Instances From Other Instances With Struct Update Syntax
- Using struct ***update syntax***, we can create a new instance of a struct that includes most of the values from another instance, but changes some.

```rust
fn main() {
  // --snip--

  let user 2 = User {
    email: String::from("another@example.com"),
    ..user1
  }
}
```
>NOTE: struct update syntax uses `=` like an assignment; for String type, it doesn't copy the data, but moves the data.

## Using Tuple Structs without Named Fields to Create Different Types
- ***tuple structs***: don't have names of fields, but only the types of the fields.
- We can use a dot(`.`) followed by the index to access an individual value.

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
  let black = Color(0, 0, 0);
  let origin = Point(0, 0, 0);
}
```

## Unit-Like Structs Without Any Fields
- ***unit-like struct***: a struct without any fields
```rust
struct AlwaysEqual;

fn main() {
  let subject = AlwaysEqual;
}
```

## Ownership of Struct Data
- In `User` struct, we used the owned `String` type rather than the `&str` string slice type.
- This makes the struct to own all of its data and for that data to be valid for as long as the entire struct is valid.

<br>

- It's also possible for structs to store references to data owned by something else, but to do so requires the use of `lifetime`.
```rust
struct User {
    active: bool,
    username: &str,
    email: &str,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        email: "someone@example.com",
        username: "someusername123",
        active: true,
        sign_in_count: 1,
    };
}

/* Compile error occurs! */
```