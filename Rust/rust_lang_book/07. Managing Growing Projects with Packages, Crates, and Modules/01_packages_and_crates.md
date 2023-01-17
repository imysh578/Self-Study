# Packages and Crates
## Crate
- **crate**: the smallest amount of code that the Rust compiler considers at a time.

Even if running `rustc` rather than `cargo` and pass a single source code file, the compiler considers the file to be a crate.
Crates can contain modules, and the module may be defined in other files that get compiled with the crate.

### Two crate's forms
#### binary crates
  - The programs we can compile to an executable that we can run, such as a command-line program or a server
  - Each must have a function called `main` that defines what happens when the executable runs.
  -  All Crates we've created so far have been binary crates.
#### library crates
  - Library cartes don't have a `main` function, and they don't compile to an executable.
  - Instead, they define functionality intended to be shared with multiple projects.
  - Most of the time when Rustaceans say "crate", they mean library crate.

## crate root 
- a source file that the Rust compiler starts from and makes up the root module of our crate

## Package
- **package**: a bundle of one or more cartes that provides a set of functionality.
- A package contains a `Cargo.toml` file that describes how to build those crates.
- Cargo
  - It is actually a package that contains the binary crate for the command-line tool we've been using to build our code.
  - It also contains a library crate that the binary crate depends on.

- A package can contain as many binary crates as we like, but at most only one library crate.
- A package must contain at least one crate, whether that's a library or binary crate.

`cargo new`: creates a package containing..
- *src/main.rs*
- *Cargo.toml* file

There's no mention of *src/main.rs* in *Cargo.toml* file
*src/main.rs* is its **crate root** of a binary crate with the same name as the package.
Cargo passes the crate root files to `rustc` to build the library or binary.

If a package contains ***src/main.rs***, it only has a binary crate.
If a package contains ***src/main.rs*** and ***src/lib.rs***, it has two crates: a binary and a library, both with the same name as the package.

A package can have multiple binary crates by placing files in the ***src/bin*** directory: each file will be a separate binary crate.