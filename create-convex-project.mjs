#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';

console.log('=== Creating Convex Project for Pro-Search ===\n');

// Since we're authenticated, let's try to push to a new deployment
// This will create a project if it doesn't exist

try {
  console.log('Attempting to deploy Convex functions...');
  console.log('This will create a new project if needed.\n');
  
  // Try deploying with a project name hint
  const deployCommand = `CONVEX_DEPLOYMENT_NAME=pro-search npx convex dev --once 2>&1`;
  
  console.log('Running:', deployCommand);
  const output = execSync(deployCommand, { 
    encoding: 'utf8',
    env: {
      ...process.env,
      CONVEX_DEPLOYMENT_NAME: 'pro-search'
    }
  });
  
  console.log('Output:', output);
  
  // Try to extract the deployment URL from the output
  const urlMatch = output.match(/https:\/\/[^\s]+\.convex\.cloud/);
  if (urlMatch) {
    const convexUrl = urlMatch[0];
    console.log('\n✅ Found Convex URL:', convexUrl);
    
    // Update .env.local
    const envContent = `# Convex Configuration
PUBLIC_CONVEX_URL=${convexUrl}
CONVEX_DEPLOYMENT=dev:pro-search

# Feature flag to use Convex
VITE_USE_CONVEX=true

# OAuth Providers (add your own keys)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Legacy Supabase (keep for now during migration)
VITE_SUPABASE_URL=${process.env.VITE_SUPABASE_URL || ''}
VITE_SUPABASE_ANON_KEY=${process.env.VITE_SUPABASE_ANON_KEY || ''}
`;
    
    fs.writeFileSync('.env.local', envContent);
    console.log('\n✅ Updated .env.local with Convex configuration');
    
    // Also update .env
    const envFileContent = fs.readFileSync('.env', 'utf8');
    if (!envFileContent.includes('PUBLIC_CONVEX_URL')) {
      const updatedEnv = envFileContent + `
# Convex Configuration
PUBLIC_CONVEX_URL=${convexUrl}
VITE_USE_CONVEX=false
`;
      fs.writeFileSync('.env', updatedEnv);
      console.log('✅ Updated .env with Convex URL');
    }
  }
  
} catch (error) {
  console.error('Error during setup:', error.message);
  console.log('\n' + error.stdout);
  console.log('\n' + error.stderr);
  
  console.log('\n=== Alternative Setup Instructions ===');
  console.log('\nYou can manually create a Convex project by:');
  console.log('1. Going to https://dashboard.convex.dev');
  console.log('2. Creating a new project called "pro-search"');
  console.log('3. Getting the deployment URL and deployment name');
  console.log('4. Updating .env.local with those values');
}