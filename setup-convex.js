#!/usr/bin/env node

// This script will help set up Convex project programmatically
// Since we can't use interactive mode in the terminal

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Function to create .env.local with Convex configuration
function createEnvLocal() {
	console.log('Creating initial .env.local file...');

	// For now, we'll create a placeholder that we'll update after getting the actual URL
	const envContent = `# Convex deployment URL will be added here after project creation
# CONVEX_DEPLOYMENT=
# PUBLIC_CONVEX_URL=

# Temporary placeholders - will be replaced with actual values
CONVEX_DEPLOYMENT=dev:pro-search
`;

	fs.writeFileSync('.env.local', envContent);
	console.log('.env.local file created with placeholders');
}

// Function to check if we can get deployment info
function checkDeploymentInfo() {
	try {
		console.log('\nChecking for existing Convex configuration...');
		const result = execSync('npx convex function-spec --format json 2>&1', {
			encoding: 'utf8',
			stdio: 'pipe'
		});
		return result;
	} catch (error) {
		console.log('No existing deployment found or not configured yet.');
		return null;
	}
}

// Main setup function
async function setupConvex() {
	console.log('=== Convex Project Setup ===\n');

	// Step 1: Create .env.local if it doesn't exist
	if (!fs.existsSync('.env.local')) {
		createEnvLocal();
	} else {
		console.log('.env.local already exists');
	}

	// Step 2: Check deployment info
	const deploymentInfo = checkDeploymentInfo();

	if (deploymentInfo) {
		console.log('\nDeployment info found:', deploymentInfo.substring(0, 200));
	}

	// Step 3: Provide instructions for manual setup
	console.log('\n=== Manual Setup Required ===');
	console.log('\nSince we cannot run interactive commands in this environment,');
	console.log('please run the following command in your local terminal:\n');
	console.log('  npx convex dev\n');
	console.log('This will:');
	console.log('1. Prompt you to log in with GitHub (if not already logged in)');
	console.log('2. Ask you to create a new project or select an existing one');
	console.log('3. Generate a CONVEX_DEPLOYMENT variable');
	console.log('4. Create the deployment URL (e.g., https://your-project.convex.cloud)\n');
	console.log('After running the command, update the .env.local file with:');
	console.log('- CONVEX_DEPLOYMENT=<your-deployment-id>');
	console.log('- PUBLIC_CONVEX_URL=<your-convex-url>\n');

	// Step 4: Create a sample configuration
	console.log('Creating sample convex.json configuration...');
	const convexConfig = {
		functions: 'convex/'
	};

	if (!fs.existsSync('convex.json')) {
		fs.writeFileSync('convex.json', JSON.stringify(convexConfig, null, 2));
		console.log('convex.json created');
	} else {
		console.log('convex.json already exists');
	}

	console.log('\n=== Setup Script Complete ===');
}

// Run the setup
setupConvex().catch(console.error);
