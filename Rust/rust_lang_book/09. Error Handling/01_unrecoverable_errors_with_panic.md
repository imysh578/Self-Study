# Unrecoverable errors with panic
- `panic!` macro: bad things happen in our code, and there's nothing we can do about it.
- Two ways to cause panic in practice
  - taking an action that causes our code to panic (such as accessing an array past the end)
  - explicitly calling the `panic!` macro
- Via an environment variable, you can also have Rust display the call stack when a panic occurs -> easy to track down the source of the panic

By default, panics will print failure message, unwind, clean up the stack and quit.

> ### Unwinding the Stack or Aborting in Response to a Panic
> When a panic occurs,
> - By default: unwinding; Rust walk back up the stack and cleans up the data from each function it encounters. -> a lot of work
> - Alternative of immediately aborting: ends the program without cleaning up
Memory that the program was using will then need to be cleaned up by the operating system. If we want to abort on panic in release moe, add this:
> ```rust
> [profile.release]
> panic = 'abort'
> ```

Let's try calling `panic!`:
```rust
fn main() {
    panic!("crash and burn");
}
```
Results:
```shell
$ cargo run
...
thread 'main' panicked at 'crash and burn', src/main.rs:2:5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

## Using a `panic!` Backtrace
Example code:
```rust
fn main() {
    let v = vec![1, 2, 3];

    v[99]; // panic! will occurs here
}
```

> In C, attempting to read beyond the end of a data structure is undefined behavior such as:
> - *buffer overread*: You might get whatever is at the location in memory that would correspond to that element in the data structure, even though the memory doesn't belong to that structure. This can lead to security vulnerabilities.


Let's set RUST_BACKTRACE environment variable to get a backtrace:
(RUST_BACKTRACE can be any value except 0)
```shell
$ RUST_BACKTRACE=1 cargo run
thread 'main' panicked at 'index out of bounds: the len is 3 but the index is 99', src/main.rs:4:5
stack backtrace:
   0: rust_begin_unwind
             at /rustc/69f9c33d71c871fc16ac445211281c6e7a340943/library/std/src/panicking.rs:575:5
   1: core::panicking::panic_fmt
             at /rustc/69f9c33d71c871fc16ac445211281c6e7a340943/library/core/src/panicking.rs:65:14
   2: core::panicking::panic_bounds_check
             at /rustc/69f9c33d71c871fc16ac445211281c6e7a340943/library/core/src/panicking.rs:151:5
   3: <usize as core::slice::index::SliceIndex<[T]>>::index
             at /rustc/69f9c33d71c871fc16ac445211281c6e7a340943/library/core/src/slice/index.rs:259:10
   4: core::slice::index::<impl core::ops::index::Index<I> for [T]>::index
             at /rustc/69f9c33d71c871fc16ac445211281c6e7a340943/library/core/src/slice/index.rs:18:9
   5: <alloc::vec::Vec<T,A> as core::ops::index::Index<I>>::index
             at /rustc/69f9c33d71c871fc16ac445211281c6e7a340943/library/alloc/src/vec/mod.rs:2736:9
   6: playground::main
             at ./src/main.rs:4:5
   7: core::ops::function::FnOnce::call_once
             at /rustc/69f9c33d71c871fc16ac445211281c6e7a340943/library/core/src/ops/function.rs:251:5
note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.
```

In order to get backtraces with the information(operating system and Rust version), debug symbols must be enabled.
Debug symbols are enabled by default when using `cargo build` or `cargo run` without the `--release` flag