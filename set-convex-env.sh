#!/bin/bash

# Script to set Convex environment variables
echo "Setting AUTH_SECRET_1 environment variable in Convex..."

# The AUTH_SECRET_1 value
AUTH_SECRET="7OGApUEM/Qm+/ecLlLrQ8sXL88TDOB/hTkbt7KmYxEk="

# Set the environment variable using Convex CLI
npx convex env set AUTH_SECRET_1 "$AUTH_SECRET"

echo "AUTH_SECRET_1 has been set!"
echo ""
echo "Now deploying Convex functions..."
npx convex dev --once

echo ""
echo "Deployment complete! Check the dashboard at:"
echo "https://dashboard.convex.dev/d/sensible-shepherd-964"