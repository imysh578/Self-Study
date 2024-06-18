mod api;

use api::task:: {
    get_task
}

use actix_web::{HttpServer, App, web::Data, middleware::Logger};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug"); // Enable debug logs
    std::env::set_var("RUST_BACKTRACE", "1"); // Enable backtrace
    env_logger::init(); // Initialize logger

    HttpServer::new(move || {
        let logger = Logger::default();
        App::new()
            .wrap(logger)
            .service(get_task)
    })
    .bind(("127.0.0.1", 80))?
    .run()
    .await
}
