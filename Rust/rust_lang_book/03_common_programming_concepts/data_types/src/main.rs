fn main() {
    /* Numeric Operation */
    // addition
    let sum = 5 + 10; // 15

    // subtraction
    let difference = 95.5 - 4.3; // 91.2

    // multiplication
    let product = 4 * 30; // 120

    // division
    let quotient1 = 56.7 / 32.2; // 1.7608695652173911
    let quotient2 = -5.0 / 3.0; // 1
    let truncated = -5 / 3; // -1

    // remainder
    let remainder = 43 % 5; // 3

    println!("sum: {}", sum);
    println!("difference: {}", difference);
    println!("product: {}", product);
    println!("quotient1: {}", quotient1);
    println!("quotient2: {}", quotient2);
    println!("truncated: {}", truncated);
    println!("remainder: {}", remainder);

    /* Boolean */
    let t = true;
    let f: bool = false;
    println!("t, f: {t}, {f}");

    /* Tuple */
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (_, y, _) = tup;

    println!("The value of y is: {y}");
    println!("The value of tup 0 is: {}", tup.0);
    println!("The value of tup 1 is: {}", tup.1);
    println!("The value of tup 2 is: {}", tup.2);

    /* Array */
    let a = [1, 2, 3, 4, 5];
    println!("The value of a[0] is: {}", a[0]);
    println!("The value of a[1] is: {}", a[1]);
}