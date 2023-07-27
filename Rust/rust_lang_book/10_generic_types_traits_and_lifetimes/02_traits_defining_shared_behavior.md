# Traits: Defining Shared Behavior
***trait***
- defines functionality a particular type has and can share with other types.
- We can use traits to define shared behavior in an abstract way.
- We can use `trait bounds` to specify that a generic type can be any type that has certain behavior.
- similar to a feature often called *interface* in other languages, although with some differences.


## Defining a Trait
A type's behavior consists of the methods we can call on that type.
Trait definitions are a way to group method signatures together to define a set of behaviors necessary to accomplish some purpose.

Example code
- structs that hold various kinds and amounts of text: `NewArticle`, `Tweet`
- We want to make a media aggregator library crate named `aggregator` that can display summaries of data that might be stored in `NewArticle` or `Tweet` instance.
- We need `summary` method for each type

`Summary` trait:
```rust
// Filename: src/lib.rs
pub trait Summary {
    fn summarize(&self) -> String;
}
```
- `fn summarize(&self) -> String;`: declare the method signatures without implementation code.
- A trait can have multiple methods in its body: the method signatures are listed one per line and each line ends in a semicolon.


## Implementing a Trait on a Type
```rust
// Filename: src/lib.rs
pub trait Summary {
    fn summarize(&self) -> String;
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```
- implement traits on types.: `impl` + trait's name + `for` struct's name

```rust
use aggregator::{Summary, Tweet};

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    };

    println!("1 new tweet: {}", tweet.summarize());
}
```
- `use aggregator::{Summary, Tweet};`: Other crates that depend on the aggregator crate can also bring the `Summary` trait into scope to implement `Summary` on their own types.
- We can implement traits on types
    1. local traits to local types
    2. external traits on local types
    3. local traits on external types
- We can't implement external traits on external types: ***orphan rule***
    -> This rule ensures that other people’s code can’t break your code and vice versa.

## Default implementations
Sometimes it’s useful to have default behavior for some or all of the methods in a trait instead of requiring implementations for all methods on every type.
- We specify a default string for the summarize method of the Summary trait instead of only defining the method signature.

```rust
// Filename: src/lib.rs
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

```

```rust
use aggregator::{self, NewsArticle, Summary};

fn main() {
    let article = NewsArticle {
        headline: String::from("Penguins win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        author: String::from("Iceburgh"),
        content: String::from(
            "The Pittsburgh Penguins once again are the best \
             hockey team in the NHL.",
        ),
    };

    println!("New article available! {}", article.summarize());
}
```


Default implementations can call other methods in the same trait, even if those other methods don’t have a default implementation.
```rust
// Filename: src/lib.rs
pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}
```

Note that it isn’t possible to call the default implementation from an overriding implementation of that same method.

## Traits as Parameters
Define a `notify` function using the `Summary` trait's method that we implemented above:
```rust
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```
- `item: &impl Summary`: we can call any methods on `item` that come from the `Summary` trait

Multiple parameters:
```rust
pub fn notify(item1: &impl Summary, item2: &impl Summary) {
    // ...
}
```

 Using ***`impl` syntax*** to specify the ***trait bound*** results in the Rust compiler generating **polymorphic** code for the function.

## Trait Bound Syntax
```rust
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
```

Multiple parameters:
```rust
pub fn notify<T: Summary>(item1: &T, item2: &T) {
    // ...
}
```

Using a ***generic type parameter*** with a ***trait bound*** results in the Rust compiler generating **monomorphized** code for the function.
(This means that a separate implementation of the function is created for each concrete type that is passed as an argument.)

## Specifying Multiple Trait Bounds with the + Syntax
We specify in the notify definition that item must implement both `Display` and `Summary`:
```rust
pub fn notify(item: &(impl Summary + Display)) {
```

trait bounds on generic types:
```rust
pub fn notify<T: Summary + Display>(item: &T) {
```

## Clearer Trait Bounds with where Clauses

Using generic types for each trait bound:
```rust
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {
```

Using a `where` clause after function signature:
```rust
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
```

## Returning Types that Implement Traits
`impl Trait` syntax in the return postion:
```rust
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    }
}
```

However, you can only use impl Trait if you’re returning a single type:
```rust
fn returns_summarizable(switch: bool) -> impl Summary {
    if switch {
        NewsArticle {
            headline: String::from(
                "Penguins win the Stanley Cup Championship!",
            ),
            location: String::from("Pittsburgh, PA, USA"),
            author: String::from("Iceburgh"),
            content: String::from(
                "The Pittsburgh Penguins once again are the best \
                 hockey team in the NHL.",
            ),
        }
    } else {
        Tweet {
            username: String::from("horse_ebooks"),
            content: String::from(
                "of course, as you probably already know, people",
            ),
            reply: false,
            retweet: false,
        }
    }
}
// Compile Error!
```

## Using Trait Bounds to Conditionally Implement Methods
Recall that `Self` is a type alias for the type of the `impl` block.

Example code:
- the type `Pair<T>` has 
    - `new` method for any types
    - `cmp_display` method for `PartialOrd` trait and `Display` trait

```rust
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
```

We can also conditionally implement a trait for any type that implements another trait.
```rust
impl<T: Display> ToString for T {
    // --snip--
}
```

