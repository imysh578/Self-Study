# Defining Modules to Control Scope and Privacy
Let's create a binary crate named `backyard`.
Then declare module `garden` and submodule `vegetables` containing `Asparagus` type.
This crate's directories:
```
backyard
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden
    │   └── vegetables.rs
    ├── garden.rs
    └── main.rs
```

## Modules Cheat Sheet
- **Start from the crate root**: When compiling a crate, the compiler first looks in the crate root file(usually *src/lib.rs* for a library crate or *src/main* for a binary crate) for code to compile.

- **Declaring Modules**: In the crate root file, we can declare new modules. The complier will look for the module's code in these places:
  - Inline, within curly brackets: `mod garden { ... }`
  - In the file ***src/garden.rs***
  - In the file ***src/garden/mod.rs***

- **Declaring submodules**: In any file except the crate root, we can declare submodules. Let's say we declare `mod vegetables;` in *src/garden.rs*. The compiler will look for the submodule's code within the directory named for the parent module in these places:
  - Inline, within curly brackets: `mod vegetables {...}`
  - In the file ***src/garden/vegetables***
  - In the file ***src/garden/vegetables***

- **Paths to code in modules**: Once a module is part of our crate, we can refer to code in that module from anywhere else in that same crate, as long as the privacy rules allow. For examples, an `Asparagus` type in the garden vegetables module would be found at `crate::garden::vegetable::Asparagus`.

- **Private vs Public**: Code within a module is private from its parent module by default. To make it public, put `pub` in front of `mod`(i.e., `pub mod`). To make items within a public module public as well, use `pub` before declaration.

- **The `use` keyword**: Within a scope, the use keyword created shortcuts to items to reduce repetition of long paths.
  - `use crate::garden::vegetable::Asparagus`: after this, we can write `Asparagus` without the prefix path(`crate::garden::vegetable::`)


***src/garden.rs***:
```rust
use crate::garden::vegetables::Asparagus;

pub mod garden;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {:?}!", plant);
}
```

- `pub mod garden;`: to include the code in *src/garden.rs*


***src/garden.rs***:
```rust
pub mod vegetables;
```
- `pub mod vegetables;` to include the code in *src/garden/vegetables.rs* 


***src/garden/vegetables.rs***:
```rust
#[derive(Debug)]
pub struct Asparagus {}
```

## Grouping Related Code in Modules
- Let's write a library crate that provides the functionality of a restaurant:
`cargo new restaurant --lib`

This crate's directories:
```
restaurant
├── Cargo.toml
└── src
    └── lib.rs
```

- We'll define the signatures of functions but leave their bodies empty.
***src/lib.rs***:
```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
        fn seat_at_table() {}
    }
    mod serving {
        fn take_order() {}
        fn serve_order() {}
        fn take_order() {}
    }
}
```
- Modules can contain other modules and also hold definitions for other items, such as structs, enums, constants, traits and functions.


By using modules, we can group related definitions together and name why they're related. Programmers using this code can navigate the code based on the groups rather than having to read through all the definitions, making it easier to find the definitions relevant to them. Programmers adding new functionality to this code would know where to place the code to keep the program organized.

Earlier, we mentioned that `src/main.rs` and `src/lib.rs` are called crate roots. The reason for their name is that the contents of either of these two files form a module named `crate` at the root of the crate's module structure, known as the **module tree**.

Module tree looks like:
```
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```

