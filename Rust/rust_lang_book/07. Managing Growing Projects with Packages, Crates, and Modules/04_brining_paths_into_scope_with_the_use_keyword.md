# Brining Paths into Scope with the `use` Keyword
`use`: to create a shortcut to a path in the scope
```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

In a different scope than the `use` statement, we can't use it.
```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

mod customer {
    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist();
    }
}

// Compile error occurs!
```

## Creating Idiomatic use Paths
### functions
Why did we use `use crate::front_of_house::hosting;` rather than `use crate::front_of_house::hosting::add_to_waitlist;` to use `add_to_waitlist` function?
- To specify this function belongs to the other module.
- Otherwise, it is unclear where the function is defined.


### structs, enums, and other items
On the other hand, it's idiomatic to specify the full path.

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}
```
The exception to this idiom is if we're bringing two items with the same name into scope with `use` statement.

```rust
use std::fmt;
use std::io;

fn function1() -> fmt::Result {
    // --snip--
    Ok(())
}

fn function2() -> io::Result<()> {
    // --snip--
    Ok(())
}
```

## Providing New Names with the `as` Keyword
There's another solution to the problem of bringing two types of the same name into the same scope with `use`.
- After the path, we can specify `as` and a new local name, or *alias*, for the type.

```rust
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // --snip--
    Ok(())
}

fn function2() -> IoResult<()> {
    // --snip--
    Ok(())
}
```

## Re-exporting Names with `pub use`
When we bring a name into scope with the `use` keyword, the name available in the new scope is private.
- ***re-exporting*** (`pub` and `use`): We are bringing an item into scope but also making that item available for others to bring into their scope.

```rust
mod front_of_house {
  pub mod hosting {
    pub fn add_to_waitlist() {}
  }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
  hosting::add_to_waitlist();
}
```
- Before this change, external code would have to call the `add_to_waitlist` function by using the path `restaurant::front_of_house::hosting::add_to_waitlist()`.
- After re-exported using `pub use`, external code can now use the path `restaurant::hosting::add_to_waitlist()` instead.

Re-exporting is useful when the internal structure of our code is different from how programmers calling our code would think about the domain.
- In this `restaurant` module, we think about "front of house" and "back of house", but customers won't think about the parts of the restaurant in those terms.

## Using External Packages
To use an external package, we need to add it into *Cargo.toml*:
```shell
[dependencies]
rand = "0.8.5"
```

Then, to bring `rand` definitions into the scope of our package, we added a `use` line starting with the name of the crate.
```rust
use rand::Rng;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1..=100);
}
```

### `std` library 
- The standard library is shipped with the Rust language, we don't need to change *Cargo.toml* to include `std`.
- But still we need to refer to it with `use` to bring items from there into our package's scope.
```rust
use std::collections::HashMap;
```

## Using Nested Paths to Clean Up Large `use` Lists
If we're using multiple items defined in the same crate or same module, listing each item on its own line can take up a lot of vertical space in our files.

```rust 
use rand::Rng;
// --snip--
use std::cmp::Ordering;
use std::io;
// --snip--
```

Instead, we can use nested paths to bring the same items into scope in one line.
```rust
// --snip--
use std::{cmp::Ordering, io};
// --snip--
```

We can use a nested path at an level in a path.
```rust
use std::io;
use std::io::Write;
```

```rust
use std::io::{self, Write};
```

## The Glob Operator
If we want to bring all public items, we can specify that path followed by the `*` globe operator:
```rust
use std::collections::*;
```

Be careful when using the glob operator!
- Glob can make it harder to tell what names are in scope and where a name used in your program was defined.

The glob operator is used...
- when testing to bring everything under test into the `tests` modules.
- as part of the prelude pattern.
