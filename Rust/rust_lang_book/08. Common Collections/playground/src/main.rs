fn main() {
    let hello = "Здравствуйте";

    let s = &hello[0..2];

    println!("{hello}");
    println!("{s}");

    for c in "Зд".chars() {
        println!("{c}");
    }
}
