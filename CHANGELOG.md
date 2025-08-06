# Changelog

All notable changes to this project will be documented in this file.

## [0.1.1] - 2025-08-06

### Added
- Complete TypeScript compilation with compiled distribution files in `dist/` directory
- All resource implementations for full API coverage:
  - `ProductResource` with search functionality
  - `CollectionResource` with name-based search
  - `Config` resource for configuration management
- Type declarations and source maps for better development experience
- Missing import for `Config` resource in main `Client` class

### Fixed
- Updated TypeScript configuration with better module resolution
- Resolved compilation issues with proper type exports
- Fixed missing resource instantiation in `Client` constructor
- Corrected TypeScript build configuration for proper CommonJS output

### Technical Improvements
- Enhanced build process with complete TypeScript compilation
- Added comprehensive type definitions across all modules
- Improved error handling and token refresh mechanism
- Better module structure with proper export/import organization

## [0.1.0] - 2025-08-06

### Changed
- **BREAKING CHANGE**: Migrated entire codebase from JavaScript to TypeScript
- **BREAKING CHANGE**: Updated build output from `src/` to `dist/` directory
- **BREAKING CHANGE**: Changed some method names for better consistency:
  - `Policy.all()` → `Policy.getAllPolicies()`
  - `General.all()` → `General.getSettings()`
  - `Page.all()` → `Page.getAllPages()`
  - `Page.find()` → `Page.getPage()`
  - `Post.all()` → `Post.getAllPosts()`
  - `Post.find()` → `Post.getPost()`
  - `Blog.all()` → `Blog.getAllBlogPosts()`
  - `Blog.find()` → `Blog.getBlogPost()`
  - `Menu.all()` → `Menu.getAllMenus()`
  - `Menu.find()` → `Menu.getMenu()`

### Added
- Full TypeScript support with complete type definitions
- Type-safe API responses and request parameters
- Generic method support for better type inference
- ESLint configuration for TypeScript
- TypeScript compilation with source maps
- Development scripts (`dev`, `typecheck`, `clean`)
- Comprehensive type definitions for all resources:
  - `Product`, `Collection`, `Page`, `Post`, `Menu`, `GeneralSettings`, `PolicyData`
  - `QueryOptions`, `ApiResponse`, `TanqoryConfig`, `TanqoryInitOptions`

### Improved
- Better developer experience with IntelliSense and auto-completion
- Compile-time error checking
- Enhanced documentation with TypeScript examples
- More robust error handling with typed error responses

### Technical Changes
- Converted all `.js` files to `.ts`
- Added TypeScript compiler configuration (`tsconfig.json`)
- Updated package.json to reference compiled output
- Added type declarations for node-fetch
- Implemented proper module exports with TypeScript

### Migration Guide

If you're upgrading from the JavaScript version:

1. **Install TypeScript support** (optional but recommended):
   ```bash
   npm install -D typescript @types/node
   ```

2. **Update your imports** to use the new TypeScript types:
   ```typescript
   import Tanqory, { Product, Collection, QueryOptions } from '@tanqory/api-client';
   ```

3. **Update method calls** for renamed methods:
   ```typescript
   // Before
   const policies = await client.policy.all();
   const pages = await client.page.all();
   
   // After
   const policies = await client.policy.getAllPolicies();
   const pages = await client.page.getAllPages();
   ```

4. **Enjoy type safety** - TypeScript will now provide compile-time checking and better IDE support!

## [0.0.3] - Previous version

### Features
- JavaScript API client for Tanqory platform
- Automatic token refresh
- Resource-based API access
- Query parameter support
