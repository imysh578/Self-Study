struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

struct RGBColor(u8, u8, u8);

fn main() {
    // Structs
    let mut user1 = User {
        username: String::from("someone"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
        active: true,
    };

    user1.username = String::from("new name");

    println!("User1: {}", user1.username);
    println!("{} {} {}", user1.email, user1.sign_in_count, user1.active);


    let mut user2 = User {
        email: String::from("anyone@example.com"),
        ..user1
    };

    user2.username = String::from("any user name");

    println!("User2: {}", user2.username);
    println!("{} {} {}", user2.email, user2.sign_in_count, user2.active);



    // Tuple Structs
    let black = RGBColor(0, 0, 0);
    println!("Black: {} {} {}", black.0, black.1, black.2);


    // functions with structs
    print!("Area without struct: {}", area_without_struct(30, 50));

    let rect = (30, 50);
    println!("Area with tuple struct: {}", area_tuple_struct(rect));
    
    let rect = Rectangle {
        width: 30,
        height: 50,
    };
    println!("Area with struct: {}", area_struct(&rect));

    // struct methods (`impl`)
    println!("Area with method: {}", rect.area());
    println!("Length with method: {}", rect.len());

    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    println!("rect1 can hold rect2: {}", rect.can_hold(&rect2));

    let square = Rectangle::square(10);
    println!("Square: {:?}", square);
}


fn area_without_struct(width: u32, height: u32) -> u32 {
    width * height
}

fn area_tuple_struct(dimensions: (u32, u32)) -> u32 {
    dimensions.0 * dimensions.1
}

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn area_struct(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}

impl Rectangle {
    // `self` is a reference to the instance of the struct
    // `Self` is the type of the struct

    // methods
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn len(&self) -> u32 {
        2 * (self.width + self.height)
    }

    // methods with multiple parameters
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    // associated functions
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}