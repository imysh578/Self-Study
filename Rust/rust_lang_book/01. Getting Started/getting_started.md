# Getting Started

## 1. Installation
### Install Rust
The script from [the book](https://doc.rust-lang.org/book/ch01-01-installation.html#installing-rustup-on-linux-or-macos) is not working. 

```shell
$ curl --proto '=https' --tlsv1.3 https://sh.rustup.rs -sSf | sh
```
- Error message: *curl: (4) A requested feature, protocol or option was not found built-in in this libcurl due to a build-time decision.*


Instead, I used the below script from [official page's guide](https://www.rust-lang.org/tools/install).

```shell
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Version Check
Luckily, this one worked well.
For now, the latest version is 1.65.0.
```shell
$ rustc --version
# rustc 1.66.0 (69f9c33d7 2022-12-12)
```

### Update Rust
To update,
```shell
$ rustup update
```

### Uninstall Rust
To uninstall, 
```shell
$ rustup self uninstall
```

## 2. Hello, World!
### Create a Project Directory
```shell
$ mkdir ~/projects
$ cd ~/projects
$ mkdir hello_world
$ cd hello_world
```

### Writing and Running a Rust Program
Create a new file, `main.rs`.
```shell
$ vim main.rs
```

Write `Hello, World` code.
```rust
# main.rs
fn main() {
    println!("Hello, World");
}
```

### Compile and run the file
```shell
$ rustc main.rs
$ ./main
Hello, world!
```

### Anatomy of a Rust Program
1. main function
```rust
fn main() {
  
}
```
- always run first 
- it can have parameters inside of `()`

2. code
```rust
    println!("Hello, world!");
```
- Rust style is to indent with ***four space***, not a tab
- Using `!` calls ***Rust macro*** instead of a normal function.
- `println!` prints the string arguments.
- End the line with a semicolon `;`. (not mandantory)

## 3. Hello, Cargo!
### What is Cargo?
- Rust's build system and package manager. (Similar to npm of Nodejs?🤔)
- Cargo handles many tasks like building codes, downloading the libraries and building libraries.
- Easy to add dependencies using Cargo.

### Check Cargo Version
- Cargo comes installed with Rust.
- So don't need to install seperately.

```shell
$ cargo --version
```

### Creating a Project with Cargo
```shell
$ cargo new hello_cargo
$ cd hello_cargo
```
- It generates a ***Cargo.toml*** file and a ***src*** folder with a file ***main.rs*** inside.
- `cargo new` initilizes ***git*** file as well, but not generated yet.
- To generate git file, you can override using `cargo new --vcs=git`.


### Building and Running a Cargo Project
To build,
```shell
$ cargo build
   Compiling hello_cargo v0.1.0 (/Users/damon.yoon/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.68s
```
The build command will create ***target/debug***.

To run,
```shell
$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/hello_cargo`
Hello, world!
```

To check if codes is executable,
```shell
$ cargo check
    Checking hello_cargo v0.1.0 (/Users/damon.yoon/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.05s
```

### Building for Release
When the project is ready for realse, use the below command to compile it with optimizations.
```shell
cargo build --release
```
This command will create ***target/release***.

- `cargo build`: for development, when you want to rebuild quickly and often
- `cargo build --release`: for building final program you'll give to a user that won't be rebuilt repeatedly
