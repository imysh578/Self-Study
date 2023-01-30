# Storing Keys with Associated Values in Hash Maps
- Standard library `HashMap<K, V>`: mapping keys of type `K` to values of type `V`
- Many programming languages support this kind of data, called hahs, map, object, hash table, dictionary, or associative array
Hash maps are useful when you want to look up data not by using an index, as you can with vectors, but by using a key that can be of any type.

## Creating a New Hash Map
- `new`: creating an empty hash map
- `insert`: adding elements

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    println!("{:?}", scores);
```

- Hash maps is the least often used of three common collections(String, Vector, Hash map).
- It's not included in the features brought into scope automatically in the prelude.
- There's no built-in macro to construct hash maps.
- Like vectors, hash maps are homogeneous: all the keys must have the same type as each other, and all of the values must have the same type.

## Accessing Value in a Hash Map

- `get`: get a value out of the hash map by providing its key
```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");
    let score = scores.get(&team_name).copied().unwrap_or(0);
    
    println!("{:?}", scores);
    println!("{:?}", score);
```
- The `get` method returns an `Option<&V>` or `None`.
- calling `copied` to get an `Option<i32>` rather than an `Option<&i32>`.
- `unwrap_or` to set `score` to zero if scores doesn't have an entry for the key.

<br/>

- We can iterate over each key/value pair in a hash map using a `for` loop
```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    for (key, value) in &scores {
        println!("{key}: {value}");
    }
```

## Hash Maps and Ownership
For types that implement the `Copy` trait, like `i32`, the values are copied into the hash map.
For owned values like `String`, the values will be moved and the hash map will be the owner of those values.
```rust
    use std::collections::HashMap;

    let field_name = String::from("Favorite color");
    let field_value = String::from("Blue");

    let mut map = HashMap::new();
    map.insert(field_name, field_value);
    // field_name and field_value are invalid at this point, try using them and
    // see what compiler error you get!
```

## Updating a Hash Map
- The number of key and value pairs is growable.
- Each unique key can only have one value associated with it at a time.
- If we replace the old value with the new value, the old value is completely gone.
- How to keep the old value?
  - adding the new value if the key doesn't already have a value
  - combining the old value and the new value

### Overwriting a Value
If we insert a value with the same key, the value associated with that key will be replaced.

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Blue"), 25);

    println!("{:?}", scores);
```

### Adding a Key and Value Only If a Key isn't Present
It's common to check whether a particular key already exists in the hash map with a value then take the following actions:
- If the key does exist in the hash map, the existing value should remain the way it is.
- If the key doesn't exist, insert it and a value for it.

`entry`: takes the key to check existence.
```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);

    scores.entry(String::from("Yellow")).or_insert(50);
    scores.entry(String::from("Blue")).or_insert(50);

    println!("{:?}", scores);
```
- `or_insert`: only insert when the value doesn't exist/


### Updating a Value Based on the Old Value
```rust
    use std::collections::HashMap;

    let text = "hello world wonderful world";

    let mut map = HashMap::new();

    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }

    println!("{:?}", map);
```
- `split_whitespace`: returns an iterator over sub-slices, separated by whitespace.
- `or_insert`: returns a mutable reference (&mut V) to the value for specified key.
- `*count`: to use existed value, we must dereference `count` using the asterisk(`*`).

## Hashing Functions
By default, `HashMap` uses a hashing function called `SipHash` that can provide resistance to Denial of Service(DoS) attacks involving hash tables.
- This is not fastest hashing algorithm available, but the trade=off for better security.

If you want faster hash function, you can switch to another function by specifying a different hasher.
- A *hasher* is a type that implements the `BuildHasher` trait.
