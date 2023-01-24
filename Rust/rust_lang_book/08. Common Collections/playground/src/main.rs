fn main() {
    {
        let v = vec![1, 2, 3, 4];
        println!("{:?}", v);
        // do stuff with v
    } // <- v goes out of scope and is freed here
    // println!("{:?}", v);
}
