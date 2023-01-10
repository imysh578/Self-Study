struct Person {
    name: String,
    age: u8,
}

impl Person {
    fn new() -> Self {
        Self {
            name: String::from("Damon"),
            age: 100,
        }
    }
}

fn main() {
    let x = Person {
        name: String::from("PowerCoding"),
        age: 99,
    };

    let y = Person::new();

    println!("{}", x.name);
    println!("{}", y.name);
}