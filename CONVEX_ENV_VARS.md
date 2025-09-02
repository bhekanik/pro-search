# Convex Environment Variables Setup

You need to set these environment variables in the Convex dashboard:

## 1. Go to Environment Variables Page

Navigate to: https://dashboard.convex.dev/d/sensible-shepherd-964/settings/environment-variables

## 2. Add the Following Variables

### Required Variables:

**AUTH_SECRET_1**

```
7OGApUEM/Qm+/ecLlLrQ8sXL88TDOB/hTkbt7KmYxEk=
```

**Important**: The variable name is `AUTH_SECRET_1` (with the number 1 at the end)

### Optional OAuth Variables (for future use):

If you want to enable GitHub OAuth login:

- **GITHUB_CLIENT_ID**: Get from https://github.com/settings/developers
- **GITHUB_CLIENT_SECRET**: Get from the same GitHub OAuth app

If you want to enable Google OAuth login:

- **GOOGLE_CLIENT_ID**: Get from https://console.cloud.google.com/
- **GOOGLE_CLIENT_SECRET**: Get from the same Google OAuth app

## 3. After Adding Variables

Once you've added the AUTH_SECRET_1, run:

```bash
npx convex dev --once
```

This will deploy all the Convex functions successfully.

## 4. Test the Deployment

After successful deployment, you can:

1. Check the dashboard: https://dashboard.convex.dev/d/sensible-shepherd-964
2. View your functions in the Functions tab
3. Check the Data tab to see your tables

## 5. Enable Convex in the App

To switch from Supabase to Convex, edit `.env.local`:

```
VITE_USE_CONVEX=true
```

Then restart your development server:

```bash
npm run dev
```
