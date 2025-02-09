
```markdown
# API Documentation: Contacts

## Overview
This API provides access to the **Contacts** data. It allows you to perform CRUD (Create, Read, Update, Delete) operations on contact records. The API is built using Django and Django Rest Framework (DRF).

### Base URL
- **URL**: `http://127.0.0.1:8000/api/contacts/`

## Authentication
This API does not require authentication, but you can add authentication mechanisms such as Token Authentication or OAuth2 in the future.

---

## Endpoints

### 1. **Get All Contacts**
- **URL**: `http://127.0.0.1:8000/api/contacts/`
- **Method**: `GET`
- **Description**: Retrieve a list of all contacts.
- **Query Parameters**: None
- **Response**:
  - `200 OK`: Returns a list of contacts.

#### Example Response:
```json
[
    {
        "id": 1,
        "image": "image_url_or_path",
        "name": "John Doe",
        "address": "123 Main St",
        "phone_number": "555-555-5555"
    },
    {
        "id": 2,
        "image": "image_url_or_path",
        "name": "Jane Smith",
        "address": "456 Oak Ave",
        "phone_number": "555-555-1234"
    }
]
```

### 2. **Create a New Contact**
- **URL**: `http://127.0.0.1:8000/api/contacts/`
- **Method**: `POST`
- **Description**: Create a new contact.
- **Request Body**: 
  - `image` (string, required): The contact's image URL or path (up to 255 characters).
  - `name` (string, required): The contact's full name (up to 255 characters).
  - `address` (string, required): The contact's address (up to 255 characters).
  - `phone_number` (string, required): The contact's phone number (up to 255 characters).

#### Example Request Body:
```json
{
    "image": "image_url_or_path",
    "name": "Alice Johnson",
    "address": "789 Pine St",
    "phone_number": "555-555-7890"
}
```

- **Response**:
  - `201 Created`: The newly created contact.
  
#### Example Response:
```json
{
    "id": 3,
    "image": "image_url_or_path",
    "name": "Alice Johnson",
    "address": "789 Pine St",
    "phone_number": "555-555-7890"
}
```

### 3. **Get a Specific Contact**
- **URL**: `http://127.0.0.1:8000/api/contacts/{id}/`
- **Method**: `GET`
- **Description**: Retrieve a specific contact by `id`.
- **Path Parameters**:
  - `id` (integer, required): The ID of the contact.
  
#### Example Response:
```json
{
    "id": 1,
    "image": "image_url_or_path",
    "name": "John Doe",
    "address": "123 Main St",
    "phone_number": "555-555-5555"
}
```

### 4. **Update a Contact**
- **URL**: `http://127.0.0.1:8000/api/contacts/{id}/`
- **Method**: `PUT`
- **Description**: Update a specific contact's details by `id`.
- **Path Parameters**:
  - `id` (integer, required): The ID of the contact.
  
#### Request Body:
You must include all fields to update the contact.

```json
{
    "image": "image_url_or_path",
    "name": "John Doe",
    "address": "123 New Address St",
    "phone_number": "555-555-5555"
}
```

- **Response**:
  - `200 OK`: The updated contact information.
  
#### Example Response:
```json
{
    "id": 1,
    "image": "image_url_or_path",
    "name": "John Doe",
    "address": "123 New Address St",
    "phone_number": "555-555-5555"
}
```

### 5. **Delete a Contact**
- **URL**: `http://127.0.0.1:8000/api/contacts/{id}/`
- **Method**: `DELETE`
- **Description**: Delete a contact by `id`.
- **Path Parameters**:
  - `id` (integer, required): The ID of the contact to delete.
  
- **Response**:
  - `204 No Content`: Contact successfully deleted.
  - `404 Not Found`: If the contact with the given `id` does not exist.

---

## Example cURL Requests

### Get All Contacts:
```bash
curl -X GET http://127.0.0.1:8000/api/contacts/
```

### Create a New Contact:
```bash
curl -X POST http://127.0.0.1:8000/api/contacts/ \
  -H "Content-Type: application/json" \
  -d '{
    "image": "image_url_or_path",
    "name": "Alice Johnson",
    "address": "789 Pine St",
    "phone_number": "555-555-7890"
  }'
```

### Get a Specific Contact:
```bash
curl -X GET http://127.0.0.1:8000/api/contacts/1/
```

### Update a Contact:
```bash
curl -X PUT http://127.0.0.1:8000/api/contacts/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "image": "image_url_or_path",
    "name": "John Doe",
    "address": "123 New Address St",
    "phone_number": "555-555-5555"
  }'
```

### Delete a Contact:
```bash
curl -X DELETE http://127.0.0.1:8000/api/contacts/1/
```

---

## Error Codes
- **400 Bad Request**: Invalid request data (e.g., missing required fields).
- **404 Not Found**: Contact not found by the provided ID.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## Notes
- All API responses are in JSON format.
- The `Contact` model has the following fields:
  - `image` (string, max length 255): The contact's image URL or path.
  - `name` (string, max length 255): The contact's full name.
  - `address` (string, max length 255): The contact's address.
  - `phone_number` (string, max length 255): The contact's phone number.
- The API is currently open and does not require authentication, but can be extended in the future for security purposes.
- If you want to extend the API with custom features (like search, filtering, etc.), additional endpoints or query parameters can be added.

---

## Version History
- **v1.0** - Initial version

---
