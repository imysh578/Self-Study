use aws_config::meta::region::RegionProviderChain;
use aws_sdk_dynamodb::types::AttributeValue;
use aws_sdk_dynamodb::Client;
use lambda_runtime::{service_fn, Error as LambdaError, LambdaEvent};
use serde::Deserialize;
use serde_json::{json, Value};
use tracing::{error, info};
use tracing_subscriber;
use uuid::Uuid;

#[tokio::main] // Required for async/await
async fn main() -> Result<(), LambdaError> {
    tracing_subscriber::fmt::init(); // Initialize the logger
    let func = service_fn(handler);
    lambda_runtime::run(func).await?;
    Ok(())
}

#[derive(Deserialize, Debug)]
struct CustomEvent {
    first_name: String,
    last_name: String,
}

async fn handler(event: LambdaEvent<CustomEvent>) -> Result<Value, LambdaError> {
    let (event, _context) = event.into_parts();

    // 로그 추가
    info!("Received event: {:?}", event);

    let uuid = Uuid::new_v4().to_string();
    let region_provider = RegionProviderChain::default_provider().or_else("us-east-1"); // Set the region
    let config = aws_config::from_env().region(region_provider).load().await; // Load the AWS configuration
    let client = Client::new(&config); // Create a new DynamoDB client

    let request = client
        .put_item() // Create a new PutItem request
        .table_name("users") // Set the table name
        .item("uid", AttributeValue::S(uuid)) // Set the item attributes
        .item("first_name", AttributeValue::S(event.first_name))
        .item("last_name", AttributeValue::S(event.last_name));

    match request.send().await {
        Ok(_) => {
            info!("Successfully wrote to DynamoDB");
            Ok(json!({ "message": "Record written"}))
        }
        Err(e) => {
            error!("Failed to write to DynamoDB: {:?}", e);
            Err(Box::new(e) as Box<dyn std::error::Error + Send + Sync>)
        }
    }
}
