# Pro-Search Codebase Overview

## 🚀 INDIE DEVELOPER CONTEXT
**This is an indie SaaS project focused on rapid market validation.**
- Target: Tens of thousands of users (not millions)
- Philosophy: Ship fast, validate, iterate
- Priority: Working features over perfect code

## 💰 THE MONEY FEATURE
**CRITICAL: Advanced Query Building with Saved Queries (requires auth)**

Pro-Search is an advanced search query builder that makes Google's powerful search operators accessible through a visual interface. Users can build complex search queries without memorizing syntax, save them for reuse, and execute them across multiple search engines simultaneously.

### Core functionality:
- **Visual Query Builder**: Point-and-click interface to build advanced search queries
- **Multi-Engine Support**: Google, DuckDuckGo, Bing, Yahoo, or all at once
- **Saved Queries** (PREMIUM): Save and reuse queries (requires authentication)
- **Query Sharing**: Share saved queries with others via links

### Critical path that must never break:
1. User builds query using filters → Query gets formatted correctly
2. User clicks search → Opens new tab(s) with properly formatted query URL
3. Authenticated users can save queries → Queries persist in Supabase
4. Users can load and re-execute saved queries

### Key files:
- `src/lib/utils/generateQueryUrl.ts` - Core query URL generation
- `src/lib/components/Filters/utils/formatQuery.ts` - Query formatting logic
- `src/lib/components/SearchBar/SearchBarBase.svelte` - Search execution
- `src/lib/utils/updateSavedQueries.ts` - Query persistence
- `src/lib/app/supabaseClient.ts` - Database connection

### Dependencies:
- **Supabase**: Authentication & database for saved queries
- **Split.io**: Feature flags for A/B testing
- **Vercel**: Hosting and deployment

### Failure impact:
- If query generation breaks → Users can't use the app at all
- If auth breaks → Users lose saved queries, reduced value proposition
- If Supabase breaks → No saved queries, no user accounts

## Quick Start

```bash
# 1. Clone and install
npm install

# 2. Set up environment variables
cp .env.example .env
# Add your Supabase URL and anon key
# Add Split.io API key for feature flags

# 3. Run development server
npm run dev

# 4. Open http://localhost:5173
```

## Architecture Overview

**Simple Monolithic SvelteKit App** ✅
- Frontend: SvelteKit with TypeScript
- Styling: TailwindCSS + DaisyUI (migrating to SCSS per README)
- Backend: Supabase (Auth + PostgreSQL)
- Hosting: Vercel
- Feature Flags: Split.io

### Directory Structure
```
src/
├── lib/
│   ├── app/           # Core app logic
│   │   ├── config/    # Search providers, recipes
│   │   ├── fixtures/  # Static data (countries, languages, etc.)
│   │   ├── types/     # TypeScript types
│   │   └── supabaseClient.ts  # Database connection
│   ├── components/    # Svelte components
│   │   ├── Filters/   # Query filter components (THE CORE)
│   │   ├── SearchBar/ # Search execution
│   │   ├── SavedQueries/ # Saved query management
│   │   └── AuthModal/ # Authentication
│   ├── stores/        # Svelte stores (state management)
│   └── utils/         # Helper functions
└── routes/            # SvelteKit pages
    ├── +page.svelte   # Main query builder page
    ├── recipes/       # Pre-built query templates
    └── saved-queries/ # User's saved queries
```

## Development Guidelines

### Priority Order
1. **Fix anything that breaks query generation** - This is the core feature
2. **Fix auth/saved queries issues** - This is the premium feature
3. **Fix bugs users complain about** - Check GitHub issues
4. **Ship features users request** - Focus on search operators
5. **Improve developer experience** - Better types, cleaner code
6. Everything else is optional

### What to Ignore
- Perfect test coverage (barely any tests exist)
- Microservices architecture (monolith is fine)
- Complex CI/CD (Vercel handles deployment)
- Performance optimization (app is already fast)
- Enterprise patterns (this is an indie project)

## Current Tech Stack

### Core Dependencies
- **@supabase/supabase-js**: Auth & database
- **@splitsoftware/splitio**: Feature flags
- **fast-fuzzy**: Fuzzy search for saved queries
- **qrcode**: Generate QR codes for sharing
- **theme-change**: Dark mode support

### Dev Stack
- **SvelteKit**: Full-stack framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **TailwindCSS + DaisyUI**: Styling (migrating to SCSS)
- **Cypress**: E2E testing (barely used)
- **Husky + lint-staged**: Git hooks

## Key Features & Components

### 1. Query Builder (Core Feature)
- **Location**: `src/lib/components/Filters/`
- **Purpose**: Visual interface for building complex search queries
- **Providers**: Google, DuckDuckGo, Bing, Yahoo
- **Filter Types**:
  - Text filters (exact match, exclude, synonyms)
  - Site filters (site:, -site:, related:)
  - File type filters
  - Date ranges
  - Geographic filters
  - Language filters
  - SafeSearch settings

### 2. Saved Queries (Premium Feature)
- **Location**: `src/lib/components/SavedQueries/`
- **Purpose**: Save and reuse complex queries
- **Features**:
  - Auto-save on search (for logged-in users)
  - Fuzzy search through saved queries
  - Share queries via QR codes
  - Sort by creation date

### 3. Authentication
- **Location**: `src/lib/components/AuthModal/`, `src/lib/stores/auth.ts`
- **Provider**: Supabase Auth
- **Features**:
  - Email/password authentication
  - Social logins (configured in Supabase)
  - Protected routes for saved queries

### 4. Search Providers
- **Location**: `src/lib/app/config/searchProviders.ts`
- **Supported**: Google, DuckDuckGo, Bing, Yahoo, All (opens all 4)
- **Extensible**: Easy to add new search engines

## Real Gotchas (Stuff That Will Bite You)

### 🔴 Critical Issues

1. **Missing Environment Variables**
   - `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are REQUIRED
   - Without these, auth and saved queries completely break
   - No local database setup - must use Supabase

2. **No Payment System**
   - App mentions "premium features" but has NO payment integration
   - No Stripe, no subscriptions, no way to monetize
   - Saved queries are free for all authenticated users

3. **Hardcoded Search Provider URLs**
   - Search engine URLs are hardcoded in `searchProviders.ts`
   - If search engines change their URL structure, app breaks
   - No error handling for failed searches

4. **No Database Schema Documentation**
   - Supabase schema is not documented anywhere
   - Table structure for saved queries is inferred from code
   - No migrations or schema versioning

### 🟡 Important Issues

5. **Mixed Styling Approaches**
   - Currently using TailwindCSS but README says migrate to SCSS
   - Inconsistent styling between components
   - Some components use inline styles

6. **Minimal Test Coverage**
   - Only one test file exists (`Base.spec.ts`)
   - No integration tests for critical paths
   - Cypress configured but unused

7. **No Error Boundaries**
   - No error handling for failed API calls
   - No user feedback when things go wrong
   - Silent failures in saved query operations

8. **Feature Flags Without Documentation**
   - Split.io integration exists but no docs on what flags exist
   - `Results_In_IFrame` flag found but purpose unclear

### 🟢 Quick Wins

9. **No Loading States**
   - No spinners or loading indicators
   - Users don't know if actions are processing

10. **No Empty States**
    - Blank screens when no saved queries
    - No onboarding or tooltips

11. **No Keyboard Shortcuts**
    - Power users would benefit from shortcuts
    - Only Enter key works in search box

## Security Analysis

### 🔴 Security Issues Found

1. **Client-Side API Keys**
   - Supabase anon key exposed to client (this is normal for Supabase)
   - Split.io API key exposed to client
   - Need Row Level Security (RLS) in Supabase

2. **No Input Sanitization**
   - User queries directly inserted into URLs
   - Potential for URL injection attacks
   - No XSS protection on saved query names

3. **No Rate Limiting**
   - Users can spam save queries
   - No limits on API calls
   - Could overwhelm Supabase free tier

## Performance Considerations

- **Bundle Size**: Not optimized, loading all filters even if unused
- **State Management**: Using Svelte stores (efficient)
- **API Calls**: No caching of saved queries
- **Search Execution**: Opens multiple tabs (browser may block)

## Deployment & Operations

- **Hosting**: Vercel (automatic deployments from `dev` branch)
- **Preview Deployments**: Every PR gets a preview URL
- **Environment Variables**: Set in Vercel dashboard
- **Monitoring**: None (consider adding Sentry)
- **Analytics**: None (consider adding Plausible/Umami)

## Recommended Improvements (Priority Order)

### Must Fix This Week (Money Feature Protection)
1. Add error handling for query generation failures
2. Add loading states for saved queries
3. Document Supabase schema
4. Add basic error boundaries

### Should Fix This Month (User Experience)
5. Add payment integration (Stripe/Lemon Squeezy)
6. Add success/error toasts for user actions
7. Add empty states with helpful messages
8. Add basic analytics to understand usage

### Nice to Have (Growth Features)
9. Add more search engines (Startpage, Searx, etc.)
10. Add query templates/recipes marketplace
11. Add team sharing for saved queries
12. Add browser extension for quick access

## Next Steps for Development

1. **Set up your `.env` file** with Supabase credentials
2. **Run the app locally** and test query generation
3. **Check GitHub issues** for user-reported bugs
4. **Focus on the money feature** - ensure query building never breaks
5. **Add payment integration** to actually monetize the premium features

## Development Workflow

```bash
# Create feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature-name

# Make changes and test locally
npm run dev

# Run linting
npm run lint

# Commit with conventional commits
git add .
git commit -m "feat: add new search filter"

# Push and create PR to dev
git push origin feature-name
# Create PR on GitHub targeting dev branch
```

## Contact & Resources

- **GitHub Issues**: Report bugs and request features
- **README**: Contains contribution guidelines
- **Vercel Dashboard**: Deployment logs and env vars
- **Supabase Dashboard**: Database and auth management

## Summary

Pro-Search is a **working product** that solves a real problem - making advanced search queries accessible. The core feature (query building) works well, but the monetization strategy needs implementation. The codebase is clean enough for an indie project, with room for iterative improvements as users provide feedback.

**Bottom Line**: Focus on keeping the query builder working, add payment processing, and ship features that users actually request. Don't over-engineer - this is an indie project that needs to validate its market fit.