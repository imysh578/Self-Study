# Separating Modules into Different Files
When modules get large, you might want to move the modules' definitions to a separate file.

The `mod` keyword declares modules, and Rust looks in a file with the same name as the module for the code that goes into that module.

For example, let's start from restaurant modules.

- ***src/lib.rs***
```rust
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
  hosting::add_to_waitlist();
}
```

- ***src/front_of_houses.rs***
```rust
pub mod hosting;
```

- ***src/front_of_house/hosting.rs***
```rust
pub fn add_to_waitlist() {}
```

## Alternate File Paths
- current style: ***src/front_of_house.rs***
- older style: ***src/front_of_house/mod.rs*** - still supported

If we use both styles for the same module, we'll get a complier error.
Using a mix of both styles for different modules in the same project is allowed, but might be confusing for people navigating our project.

- The main downside to use *mod.rs*: too many files named `mod.rs` in a project

