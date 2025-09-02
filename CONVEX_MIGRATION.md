# Convex Migration Guide

This document outlines the migration from Supabase to Convex for the Pro-Search application.

## Migration Status

✅ **Completed:**
- Convex setup and configuration
- Schema definition for all required tables
- Authentication setup with Convex Auth
- Query functions for saved queries, settings, and search providers
- Frontend stores and components for Convex
- Unified stores for gradual migration

⏳ **In Progress:**
- Frontend integration with unified stores
- Testing migration path

🔲 **Pending:**
- Data migration from Supabase to Convex
- Complete removal of Supabase dependencies
- Production deployment

## Quick Start

### 1. Set up Convex Account

1. Go to [convex.dev](https://convex.dev) and create an account
2. Create a new project for Pro-Search
3. Get your deployment URL and deployment name

### 2. Configure Environment Variables

Update your `.env` file:

```env
# Enable Convex (set to true when ready)
VITE_USE_CONVEX=true

# Convex Configuration
PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=your-deployment-name

# Optional: OAuth Providers for Convex Auth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Deploy Convex Functions

```bash
npx convex deploy
```

### 4. Seed Initial Data

After deployment, run the seed function to create search providers:

```bash
npx convex run searchProviders:seedSearchProviders
```

## Migration Strategy

The migration uses a feature flag (`VITE_USE_CONVEX`) to gradually transition from Supabase to Convex:

1. **Phase 1: Dual Support** (Current)
   - Both Supabase and Convex code exist
   - Unified stores route to appropriate backend
   - Feature flag controls which backend is used

2. **Phase 2: Testing**
   - Enable Convex in development
   - Test all features with Convex backend
   - Migrate test data

3. **Phase 3: Production Migration**
   - Export data from Supabase
   - Import data to Convex
   - Enable Convex in production
   - Monitor for issues

4. **Phase 4: Cleanup**
   - Remove Supabase dependencies
   - Remove unified stores
   - Use Convex stores directly

## Data Migration Script

To migrate existing data from Supabase to Convex:

```typescript
// TODO: Create migration script
// 1. Export saved queries from Supabase
// 2. Export user settings from Supabase
// 3. Transform data format if needed
// 4. Import to Convex using mutations
```

## Key Changes

### Authentication
- **Before**: Supabase Auth with email/password and social providers
- **After**: Convex Auth with same providers plus better session management

### Database
- **Before**: PostgreSQL via Supabase
- **After**: Convex's document database with real-time subscriptions

### API Calls
- **Before**: REST API calls to Supabase
- **After**: Type-safe function calls to Convex

### Real-time Updates
- **Before**: Manual polling or Supabase subscriptions
- **After**: Automatic real-time updates with Convex queries

## Benefits of Migration

1. **Better Developer Experience**
   - Type-safe API with auto-generated TypeScript types
   - No SQL queries to write or maintain
   - Simpler authentication setup

2. **Performance**
   - Real-time updates without polling
   - Optimistic updates for better UX
   - Edge deployment for low latency

3. **Cost**
   - Generous free tier for indie projects
   - No separate database costs
   - Built-in authentication (no Auth0/Clerk needed)

4. **Simplicity**
   - Single deployment for backend
   - No ORM or migration files
   - Schema changes are simple TypeScript updates

## Testing Checklist

Before fully migrating to Convex, ensure these features work:

- [ ] User registration with email/password
- [ ] Social login (GitHub, Google)
- [ ] Saving new queries
- [ ] Loading saved queries
- [ ] Deleting saved queries
- [ ] Updating user settings
- [ ] Query autosave (if enabled)
- [ ] Search provider selection
- [ ] Query sharing via QR codes

## Rollback Plan

If issues arise during migration:

1. Set `VITE_USE_CONVEX=false` in environment
2. Redeploy application
3. Users continue with Supabase backend
4. Fix issues and retry migration

## Support

For Convex-specific issues:
- [Convex Documentation](https://docs.convex.dev)
- [Convex Discord](https://convex.dev/community)
- [Convex Auth Guide](https://labs.convex.dev/auth)

## Next Steps

1. Test Convex integration in development
2. Create data migration script
3. Plan production migration window
4. Update documentation after migration