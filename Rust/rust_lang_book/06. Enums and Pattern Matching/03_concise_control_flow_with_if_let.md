# Concise Control Flow with if let

```rust
    let config_max = Some(3u8);
    match config_max {
        Some(max) => println!("The maximum is configured to be {}", max),
        _ => (),
    }
```
To satisfy the match expression, we used`_ => ()` only for `None` value.

Make it shorter using `if let`:
```rust
    let config_max = Some(3u8);
    if let Some(max) = config_max {
        println!("The maximum is configured to be {}", max)
    }
```

Using `if let` means less typing, less indentation, and less boilerplate code.
However, you lose the exhaustive checking the `match` enforces.

We can add `else` with `if let`.
Using match:
```rust
    let mut count = 0;
    match coin {
        Coin::Quarter(state) => println!("State quarter from {:?}!", state),
        _ => count += 1,
    }
```

Using `if let` and `else`:
```rust
    let mut count = 0;
    if let Coin::Quarter(state) = coin {
        println!("State quarter from {:?}!", state);
    } else {
        count += 1;
    }
```

