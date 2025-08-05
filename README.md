นี่คือไฟล์ `README.md` ที่สมบูรณ์สำหรับ Library ของคุณ โดยอ้างอิงจากโค้ดที่คุณให้มา

-----

# `@tanqory/api-client`

A powerful JavaScript API client for interacting with the Tanqory platform. This library provides a clean and intuitive interface for managing your site's data, including products, collections, pages, and more, with built-in features like automatic token refreshing and flexible query parameters.

## Features

  - **Modular Design**: Use dedicated classes for each resource (`Product`, `Page`, `Theme`, etc.).
  - **RESTful Interface**: Methods like `all()`, `find()`, and `save()` provide a familiar experience.
  - **Automatic Token Refresh**: The client automatically handles refreshing expired access tokens using a provided refresh token.
  - **Flexible Queries**: Easily filter, sort, and paginate data with powerful query options.

## Installation

You can install the library using npm:

```bash
npm install @tanqory/api-client
```

## Quick Start

### 1\. Initialization

First, initialize the client with your `accessToken`, `refreshToken`, and `siteId`. The `siteId` is essential for all API requests.

```javascript
const Tanqory = require('@tanqory/api-client');

// Initialize the client
const client = Tanqory.init({
  siteId: "your-site-id",
  accessToken: "your-access-token",
  refreshToken: "your-refresh-token"
});
```

> **Note:** If the `accessToken` expires, the client will automatically use the `refreshToken` to get a new one before retrying the request.

### 2\. Using Resources

The `client` object contains various resource classes that provide methods for interacting with the Tanqory API.

#### Products

The `product` resource allows you to manage your site's products.

```javascript
// Get all products
const allProducts = await client.product.all();
console.log(allProducts.data);

// Find a product by its ID
const product = await client.product.find("product-id-123");
console.log(product);

// Search for products by name
const foundProducts = await client.product.searchByName("Tanqory Mug");
console.log(foundProducts);
```

#### Pages

The `page` resource is used to manage pages on your online store. It uses a specific form ID for fetching documents.

```javascript
// Get all pages with pagination
const pages = await client.page.all({ limit: 10, next: "" });
console.log(pages.items);

// Find a specific page by ID
const page = await client.page.find("page-id-456");
console.log(page.items[0]);
```

#### Collections

The `collection` resource provides methods for managing product collections.

```javascript
// Get all collections
const allCollections = await client.collection.all();
console.log(allCollections.items);

// Find a collection by ID
const collection = await client.collection.find("collection-id-789");
console.log(collection);

// Search collections by name
const matchingCollections = await client.collection.searchByName("Summer");
console.log(matchingCollections);
```

#### Blog Posts (`Post` resource)

The `post` resource is designed for managing blog posts.

```javascript
// Get the latest blog posts
const latestPosts = await client.post.all({ limit: 5 });
console.log(latestPosts.items);
```

#### Menus (`Menu` resource)

You can manage your site's navigation menus with the `menu` resource.

```javascript
// Get all menus
const allMenus = await client.menu.all();
console.log(allMenus.items);
```

#### Site Settings

The client provides dedicated resources for accessing site-wide settings.

  - **General Settings (`General` resource)**

    ```javascript
    const generalSettings = await client.general.all();
    console.log(generalSettings);
    ```

  - **Policy and Privacy Data (`Policy` resource)**

    ```javascript
    const policyData = await client.policy.all();
    console.log(policyData);
    ```

## API Reference

### `client.product`

  - `all(options)`: Fetches all products. Options can include `limit`, `next`, `sort`, `order`, `search`, and `country`.
  - `find(id)`: Fetches a single product by its ID.
  - `searchByName(name)`: Searches products by name.

### `client.collection`

  - `all(options)`: Fetches all collections. Options can include `limit`, `next`, `sort`, `order`, `search`, and `country`.
  - `find(id)`: Fetches a single collection by its ID.
  - `searchByName(name)`: Searches collections by name.

### `client.page`

  - `all(options)`: Fetches all pages. Options can include `limit`, `next`, `sort`, `order`, and `search`.
  - `find(id)`: Fetches a single page by its ID.

### `client.post`

  - `all(options)`: Fetches all blog posts. Options can include `limit`, `next`, `sort`, `order`, and `search`.
  - `find(id)`: Fetches a single blog post by its ID.

### `client.menu`

  - `all(options)`: Fetches all menus. Options can include `limit`, `next`, `sort`, `order`, and `search`.
  - `find(id)`: Fetches a single menu by its ID.

### `client.general`

  - `all()`: Fetches the site's general settings.

### `client.policy`

  - `all()`: Fetches the site's privacy and data policy.

## Contributing

We welcome contributions to the Tanqory API client. Please feel free to open issues or submit pull requests on our GitHub repository.