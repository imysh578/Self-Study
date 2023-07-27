pub mod garden {
    pub mod vegetable {
        #[derive(Debug)]
        pub struct Asparagus {}
    }
}

use crate::garden::vegetable::Asparagus;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {:?}!", plant);
}