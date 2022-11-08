# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

**_Table of Contents_**

-   [API and Database Requirements](#api-and-database-requirements)
    -   [API Endpoints](#api-endpoints)
        -   [Users](#users)
        -   [Products](#products)
        -   [Orders](#orders)
    -   [Data Schema](#data-schema)
        -   [Products Schema](#products-schema)
        -   [Users Schema](#users-schema)
        -   [Orders Schema](#orders-schema)
    -   [Data Shapes](#data-shapes)
        -   [User](#user)
        -   [Product](#product)
        -   [Order](#order)

## API Endpoints

### Users

-   Index - **`token required`**

    -   HTTP verb `GET`
    -   Endpoint:- `/api/users/`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `Array of user objects`

        ```json
        {
            "status": true,
            "data": {
                "users": [
                    {
                        "id": 1,
                        "email": "ahmadghallab@gmail.com",
                        "first_name": "Ahmad",
                        "last_name": "Ghallab"
                    }
                ]
            },
            "message": "Users list"
        }
        ```

-   Show **`token required`**

    -   HTTP verb `GET`
    -   Endpoint:- `/api/users/:id` - **id of the user to be retrieved**
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `User object`

        ```json
        {
            "status": "success",
            "data": {
                "user": {
                    "id": 1,
                    "email": "ahmadghallab@gmail.com",
                    "first_name": "Ahmad",
                    "last_name": "Ghallab"
                }
            },
            "message": "User by id"
        }
        ```

-   Current authenticated user **`token required`**

    -   HTTP verb `GET`
    -   Endpoint:- `/api/users/auth/current`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `User object`

        ```json
        {
            "status": true,
            "message": "Current authenticated user",
            "data": {
                "id": 1,
                "email": "ahmadghallab@gmail.com",
                "iat": 1665222536
            }
        }
        ```

-   Create **`token required`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/users`
    -   Request Body

        ```json
        {
            "email": "ahmadghallab@gmail.com",
            "first_name": "Ahmad",
            "last_name": "Ghallab",
            "password": "123456"
        }
        ```

    -   Response Body -- `User object`

        ```json
        {
            "status": true,
            "message": "User created successfully",
            "data": {
                "id": 1,
                "email": "ahmadghallab@gmail.com",
                "first_name": "Ahmad",
                "last_name": "Ghallab"
            }
        }
        ```

-   Sign in **`Sets the token on the client within a cookie for further requests`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/users/signin`
    -   Request Body

        ```json
        {
            "email": "ahmadghallab@gmail.com",
            "password": "123456"
        }
        ```

    -   Response Body -- `User object`

        ```json
        {
            "status": true,
            "message": "Logged in successfully",
            "data": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhaG1hZGdoYWxsYWJAZ21haWwuY29tIiwiaWF0IjoxNjY1MjIxODIwfQ.qvik-CSCjDxKRLeGjEghYOjUSrICJ7KZZu_pBYGzzAg",
                "user": {
                    "id": 1,
                    "email": "ahmadghallab@gmail.com",
                    "first_name": "Ahmad",
                    "last_name": "Ghallab"
                }
            }
        }
        ```

-   Sign out **`Clear the token and destroy the session`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/users/signout`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body

        ```json
        {
            "status": true,
            "message": "Logged out successfully",
            "data": null
        }
        ```

### Products

-   Index

    -   HTTP verb `GET`
    -   Endpoint:- `/api/products/`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `Array of products`

        ```json
        {
            "status": true,
            "message": "Products list",
            "data": [
                {
                    "id": 1,
                    "name": "Product 1",
                    "price": 120,
                    "category": null
                }
            ]
        }
        ```

-   Show

    -   HTTP verb `GET`
    -   Endpoint:- `/api/products/:id` - **id of the product to be retrieved**
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `Product object`

        ```json
        {
            "status": true,
            "message": "Products by id",
            "data": {
                "id": 1,
                "name": "Product 1",
                "price": 120,
                "category": null
            }
        }
        ```

-   Create **`token required`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/products`
    -   Request Body

        ```json
        {
            "name": "Product 1",
            "price": 120
        }
        ```

    -   Response Body -- `Product object`

        ```json
        {
            "status": true,
            "message": "Product created successfully",
            "data": {
                "id": 1,
                "name": "Product 1",
                "price": 120,
                "category": null
            }
        }
        ```

### Orders

-   Current order by user - **`token required`**

    -   HTTP verb `GET`
    -   Endpoint:- `/api/orders/current-by-user`
    -   Request Body

        ```json
          N/A
        ```

    -   Response Body -- `Order object`

        ```json
        {
            "status": true,
            "message": "Current order by user",
            "data": {
                "id": 1,
                "product_id": 1,
                "quantity": 5
            }
        }
        ```

-   Create **`token required`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/orders`
    -   Request Body

        ```json
        {
            "product_id": 1,
            "quantity": 5
        }
        ```

    -   Response Body -- `Order object`

        ```json
        {
            "status": true,
            "message": "Order created successfully",
            "data": {
                "id": 1,
                "product_id": 1,
                "user_id": 1,
                "quantity": 5,
                "status": "active"
            }
        }
        ```

## Data Schema

### Products Schema

```sql
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price float NOT NULL,
  category VARCHAR
);
```

### Users Schema

```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password VARCHAR NOT NULL
);
```

### Orders Schema

```sql
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  quantity integer NOT NULL,
  status orderStatus DEFAULT 'active'
);
```

## Data Shapes

### User

```typescript
type User = {
    id?: number
    email: string
    first_name: string
    last_name: string
    password?: string
}
```

### Product

```typescript
type Product = {
    id?: number
    name: string
    price: number
    category?: string | null
}
```

### Order

```typescript
type Order = {
    id?: number
    product_id: number
    user_id?: number
    quantity: number
    status?: string
}
```
