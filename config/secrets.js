// This module is responsible for loading application secrets.
// It supports loading from AWS Secrets Manager in production and falling back
// to a local .env file for development environments.

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

// --- Configuration ---
// IMPORTANT: Replace these values with your specific AWS configuration.
const SECRET_NAME = "Website-ENV"; // The name of your secret in AWS Secrets Manager.
const AWS_REGION = "us-east-2";    // The AWS region where your secret is stored.

// Initialize the AWS Secrets Manager client.
const client = new SecretsManagerClient({
  region: AWS_REGION,
});

/**
 * Asynchronously loads secrets into the application's environment variables (process.env).
 * In a 'development' environment, it loads from a local '.env' file.
 * In any other environment (e.g., 'production'), it fetches from AWS Secrets Manager.
 */
const loadSecrets = async () => {
  // Check if running in a local development environment.
  if (process.env.NODE_ENV === 'development') {
    console.log("Running in development mode. Loading secrets from .env file...");
    // Dynamically load and configure dotenv.
    require('dotenv').config();
    console.log("✅ Local .env file loaded successfully.");
    return; // Stop execution after loading local .env
  }

  // --- Production Mode: Fetch from AWS Secrets Manager ---
  console.log(`Production mode: Attempting to load secrets from AWS Secrets Manager (Secret: ${SECRET_NAME})...`);

  try {
    // Create and send the command to AWS to get the secret value.
    const command = new GetSecretValueCommand({
      SecretId: SECRET_NAME,
      VersionStage: "AWSCURRENT", // Recommended to use the default.
    });
    const response = await client.send(command);

    if (response.SecretString) {
      // The secret is typically stored as a JSON string. Parse it.
      const secrets = JSON.parse(response.SecretString);

      // Inject each fetched secret into the Node.js process environment variables.
      Object.keys(secrets).forEach(key => {
        process.env[key] = secrets[key];
      });

      console.log("✅ Secrets loaded and injected successfully from AWS Secrets Manager.");
    } else {
      // This case is unlikely but handled for completeness.
      console.error("❌ Fatal: SecretString from AWS was empty. Application cannot start.");
      process.exit(1);
    }
  } catch (error) {
    // If there's any error fetching from AWS, log it and terminate the application.
    // This is a critical failure because the app cannot run without its configuration.
    console.error("❌ Fatal: Could not load secrets from AWS Secrets Manager.", error);
    process.exit(1); // Exit with a failure code.
  }
};

// Export the function to be used in server.js
module.exports = { loadSecrets };
