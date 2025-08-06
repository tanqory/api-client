# Development Guide

## TypeScript Migration

This project has been successfully migrated from JavaScript to TypeScript. Here's what changed:

### File Structure

```
src/
├── types.ts                    # Type definitions
├── config.ts                   # Configuration management
├── endpoints.ts                # API endpoints
├── client.ts                   # Main client class
├── tanqory.ts                  # Main library entry
├── index.ts                    # Export entry point
├── types/
│   └── node-fetch.d.ts        # Node-fetch type declarations
└── resources/
    ├── Base.ts                 # Base resource class
    ├── Policy.ts               # Policy resource
    ├── General.ts              # General settings resource
    ├── Page.ts                 # Page resource
    ├── Post.ts                 # Post resource
    ├── Blog.ts                 # Blog resource
    ├── Menu.ts                 # Menu resource
    ├── Product.ts              # Product resource
    ├── Collection.ts           # Collection resource
    └── Config.ts               # Config resource
```

### Development Scripts

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Build and watch for changes
npm run dev
# or
npm run build:watch

# Type checking only (no compilation)
npm run typecheck

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build output
npm run clean

# Full clean build
npm run clean && npm run build
```

### Type Safety

All resources now have proper TypeScript types:

- **Complete type coverage** for all API responses
- **Type-safe method parameters** with intellisense
- **Generic support** for custom typing
- **Compile-time error checking**

### Key Changes

1. **Method Renaming**: Some methods were renamed for consistency
2. **Type Exports**: All types are exported for consumer use  
3. **Generic Methods**: Better type inference with generics
4. **Strict Types**: Proper null checking and optional properties

### Testing Your Changes

After making changes:

1. Run `npm run typecheck` to verify types
2. Run `npm run lint` to check code quality  
3. Run `npm run build` to ensure compilation works
4. Test with the example file: `npx ts-node example.ts`

### Publishing

Before publishing:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run `npm run prepublishOnly` (cleans and builds)
4. Test the built package
5. Run `npm publish`
