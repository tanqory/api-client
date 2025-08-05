# @tanqory/api-client

[![npm version](https://badge.fury.io/js/%40tanqory%2Fapi-client.svg)](https://badge.fury.io/js/%40tanqory%2Fapi-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

A powerful JavaScript API client for interacting with the Tanqory platform. This library provides a clean and intuitive interface for managing your site's data, including products, collections, pages, and more, with built-in features like automatic token refreshing and flexible query parameters.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Resources](#resources)
  - [Products](#products)
  - [Collections](#collections)
  - [Pages](#pages)
  - [Blog Posts](#blog-posts-post-resource)
  - [Menus](#menus-menu-resource)
  - [Site Settings](#site-settings)
- [Error Handling](#error-handling)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🏗️ **Modular Design**: Use dedicated classes for each resource (`Product`, `Collection`, `Page`, `Post`, `Menu`, etc.)
- 🔄 **RESTful Interface**: Methods like `all()`, `find()`, and `searchByName()` provide a familiar experience
- 🔐 **Automatic Token Refresh**: The client automatically handles refreshing expired access tokens using a provided refresh token
- 🔍 **Flexible Queries**: Easily filter, sort, and paginate data with powerful query options
- 🌐 **Country-specific Content**: Support for country-specific product and collection data
- ⚡ **Lightweight**: Minimal dependencies with a clean, simple API
- 📝 **TypeScript Support**: Built-in TypeScript definitions for better development experience

## Installation

You can install the library using npm, yarn, or pnpm:

```bash
# npm
npm install @tanqory/api-client

# yarn
yarn add @tanqory/api-client

# pnpm
pnpm add @tanqory/api-client
```

### Requirements

- Node.js 14.0.0 or higher
- A valid Tanqory site ID, access token, and refresh token

## Quick Start

### Initialization

First, initialize the client with your credentials. The `siteId` is essential for all API requests.

```javascript
const Tanqory = require('@tanqory/api-client');

// Initialize the client
const client = Tanqory.init({
  siteId: "your-site-id",
  accessToken: "your-access-token",
  refreshToken: "your-refresh-token"
});
```

### ES6 Modules

```javascript
import Tanqory from '@tanqory/api-client';

const client = Tanqory.init({
  siteId: "your-site-id",
  accessToken: "your-access-token", 
  refreshToken: "your-refresh-token"
});
```

> **🔒 Security Note:** The client automatically refreshes expired access tokens using the refresh token, ensuring uninterrupted API access.

### Basic Usage Example

```javascript
async function example() {
  try {
    // Get all products
    const products = await client.product.all();
    console.log(`Found ${products.data.length} products`);

    // Search for a specific product
    const searchResults = await client.product.searchByName("T-shirt");
    console.log(`Found ${searchResults.length} matching products`);

    // Get a specific collection
    const collection = await client.collection.find("summer-2024");
    console.log(`Collection: ${collection.name}`);
  } catch (error) {
    console.error('API Error:', error.message);
  }
}

example();
```

## Resources

The `client` object contains various resource classes that provide methods for interacting with the Tanqory API.

### Products

The `product` resource allows you to manage your site's products with full query capabilities.

```javascript
// Get all products with default options
const allProducts = await client.product.all();
console.log(allProducts.data);

// Get products with advanced filtering
const filteredProducts = await client.product.all({
  limit: 20,
  sort: 'name',
  order: 'asc',
  search: 'shirt',
  country: 'US'
});

// Find a specific product by ID
const product = await client.product.find("product-id-123");
console.log(product);

// Search for products by name
const foundProducts = await client.product.searchByName("Tanqory Mug");
console.log(`Found ${foundProducts.length} products`);

// Pagination example
let nextToken = '';
do {
  const page = await client.product.all({ 
    limit: 10, 
    next: nextToken 
  });
  
  console.log(`Processing ${page.data.length} products`);
  nextToken = page.next || '';
} while (nextToken);
```

### Pages

The `page` resource manages pages on your online store. It uses a specific form ID for fetching documents.

```javascript
// Get all pages with pagination
const pages = await client.page.all({ 
  limit: 10, 
  next: "" 
});
console.log(`Found ${pages.items.length} pages`);

// Get pages with search
const searchedPages = await client.page.all({
  search: "about",
  limit: 5
});

// Find a specific page by ID
const page = await client.page.find("page-id-456");
console.log(page.items[0]);

// Get pages sorted by creation date
const recentPages = await client.page.all({
  sort: 'created_at',
  order: 'desc',
  limit: 20
});
```

### Collections

The `collection` resource provides methods for managing product collections with the same query capabilities as products.

```javascript
// Get all collections
const allCollections = await client.collection.all();
console.log(allCollections.items);

// Get collections with filtering and sorting
const sortedCollections = await client.collection.all({
  limit: 15,
  sort: 'created_at',
  order: 'desc',
  country: 'TH'
});

// Find a specific collection by ID
const collection = await client.collection.find("collection-id-789");
console.log(`Collection: ${collection.name}`);

// Search collections by name
const matchingCollections = await client.collection.searchByName("Summer");
console.log(`Found ${matchingCollections.length} summer collections`);
```

### Blog Posts (`Post` resource)

The `post` resource is designed for managing blog posts with full query and pagination support.

```javascript
// Get the latest blog posts
const latestPosts = await client.post.all({ 
  limit: 5,
  sort: 'published_at',
  order: 'desc' 
});
console.log(`Latest ${latestPosts.items.length} posts`);

// Search for posts by keyword
const searchPosts = await client.post.all({
  search: "tutorial",
  limit: 10
});

// Find a specific blog post
const post = await client.post.find("post-id-123");
console.log(`Post: ${post.title}`);
```

### Menus (`Menu` resource)

You can manage your site's navigation menus with the `menu` resource.

```javascript
// Get all menus
const allMenus = await client.menu.all();
console.log(`Found ${allMenus.items.length} menus`);

// Get a specific menu by ID
const mainMenu = await client.menu.find("main-menu-id");
console.log(`Menu: ${mainMenu.name}`);

// Get menus with sorting
const sortedMenus = await client.menu.all({
  sort: 'name',
  order: 'asc'
});
```

### Site Settings

The client provides dedicated resources for accessing site-wide settings and configuration.

#### General Settings (`General` resource)

Access your site's general configuration and settings.

```javascript
// Get general site settings
const generalSettings = await client.general.all();
console.log('Site name:', generalSettings.site_name);
console.log('Currency:', generalSettings.currency);
console.log('Timezone:', generalSettings.timezone);
```

#### Policy and Privacy Data (`Policy` resource)

Retrieve your site's privacy policy and terms of service.

```javascript
// Get policy and privacy data
const policyData = await client.policy.all();
console.log('Privacy policy:', policyData.privacy_policy);
console.log('Terms of service:', policyData.terms_of_service);
```

## Error Handling

The client provides comprehensive error handling with specific error types:

```javascript
try {
  const product = await client.product.find("non-existent-id");
} catch (error) {
  if (error.status === 404) {
    console.log('Product not found');
  } else if (error.status === 401) {
    console.log('Authentication failed - check your tokens');
  } else if (error.status === 429) {
    console.log('Rate limit exceeded - please retry later');
  } else {
    console.error('API Error:', error.message);
  }
}
```

### Token Refresh Handling

The client automatically handles token refresh, but you can also handle refresh failures:

```javascript
client.on('tokenRefreshFailed', (error) => {
  console.error('Failed to refresh token:', error);
  // Handle re-authentication flow
});

client.on('tokenRefreshed', (newTokens) => {
  console.log('Tokens refreshed successfully');
  // Optionally store new tokens
});
```

## API Reference

### Common Query Options

Most resource methods accept an `options` object with the following parameters:

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `limit` | `number` | Number of items to return | `50` |
| `next` | `string` | Pagination token for next page | `""` |
| `sort` | `string` | Field to sort by | `"created_at"` |
| `order` | `string` | Sort order: `"asc"` or `"desc"` | `"desc"` |
| `search` | `string` | Search term to filter results | `""` |
| `country` | `string` | Country code for localized content | `""` |

### `client.product`

Manage products and product data.

#### Methods

- **`all(options?)`**: Fetches all products with optional filtering, sorting, and pagination
  ```javascript
  const products = await client.product.all({
    limit: 20,
    sort: 'name',
    order: 'asc',
    search: 'shirt',
    country: 'US'
  });
  ```

- **`find(id)`**: Fetches a single product by its ID
  ```javascript
  const product = await client.product.find("product-123");
  ```

- **`searchByName(name)`**: Searches products by name
  ```javascript
  const results = await client.product.searchByName("T-shirt");
  ```

### `client.collection`

Manage product collections.

#### Methods

- **`all(options?)`**: Fetches all collections (supports same options as products)
- **`find(id)`**: Fetches a single collection by its ID
- **`searchByName(name)`**: Searches collections by name

### `client.page`

Manage site pages and content.

#### Methods

- **`all(options?)`**: Fetches all pages (supports `limit`, `next`, `sort`, `order`, `search`)
- **`find(id)`**: Fetches a single page by its ID

### `client.post`

Manage blog posts and articles.

#### Methods

- **`all(options?)`**: Fetches all blog posts (supports `limit`, `next`, `sort`, `order`, `search`)
- **`find(id)`**: Fetches a single blog post by its ID

### `client.menu`

Manage navigation menus.

#### Methods

- **`all(options?)`**: Fetches all menus (supports `limit`, `next`, `sort`, `order`, `search`)
- **`find(id)`**: Fetches a single menu by its ID

### `client.general`

Access general site settings.

#### Methods

- **`all()`**: Fetches the site's general settings and configuration

### `client.policy`

Access privacy and policy data.

#### Methods

- **`all()`**: Fetches the site's privacy policy and terms of service

### Response Format

All API responses follow a consistent format:

```javascript
// For list operations (all, search)
{
  "data": [...],      // Array of items
  "items": [...],     // Alternative array format (some endpoints)
  "next": "token",    // Pagination token
  "total": 100,       // Total count (when available)
  "limit": 20         // Applied limit
}

// For single item operations (find)
{
  "id": "item-123",
  "name": "Item Name",
  // ... other item properties
}
```

## Contributing

We welcome contributions to the Tanqory API client! Here's how you can help:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/your-username/api-client.git
   cd api-client
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** and test them thoroughly
3. **Commit your changes** with a descriptive message
   ```bash
   git commit -m "Add feature: your feature description"
   ```
4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request** on GitHub

### Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when possible
- Update documentation for any API changes
- Ensure all existing tests pass

### Reporting Issues

Please use the [GitHub issue tracker](https://github.com/tanqory/api-client/issues) to report bugs or request features. When reporting bugs, please include:

- A clear description of the issue
- Steps to reproduce the problem
- Expected vs actual behavior
- Your environment details (Node.js version, OS, etc.)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 **Documentation**: [GitHub Repository](https://github.com/tanqory/api-client)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/tanqory/api-client/issues)
- 💬 **Questions**: Contact us at [dev@tanqory.com](mailto:dev@tanqory.com)
- 🌐 **Website**: [https://tanqory.com](https://tanqory.com)

---

Made with ❤️ by [TANQ PTE. LTD.](https://tanqory.com)