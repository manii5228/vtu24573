# Notification System Design

## Architecture

The notification system follows a layered architecture pattern:

```
Client (React) --> API Layer (Axios) --> Express Routes --> Controller --> Service --> Repository
```

## Backend Architecture

### Layers

1. **Routes** - Define API endpoints and attach middleware
2. **Controllers** - Handle HTTP request/response, delegate to services
3. **Services** - Business logic and orchestration
4. **Repository** - Data access layer (in-memory store)
5. **Middleware** - Cross-cutting concerns (logging, validation, errors)

### Data Flow

```
Request --> Logger Middleware --> Route --> Validation --> Controller --> Service --> Repository
                                                                                      |
Response <-- Error Middleware <--------------------------------------------------- Response
```

### In-Memory Storage

Since no database is required, notifications are stored in a JavaScript array. Each notification has:

- `id` - UUID v4
- `title` - Notification title (required)
- `message` - Notification body (required)
- `type` - info | warning | alert | reminder | update
- `priority` - low | medium | high | urgent
- `status` - read | unread
- `createdAt` - ISO timestamp

## Frontend Architecture

### Component Hierarchy

```
App
├── Navbar
└── Dashboard (Page)
    ├── Stats Cards (Total, Unread, Read)
    ├── NotificationForm
    └── NotificationList
        └── NotificationCard (for each notification)
```

### State Management

- `useNotifications` custom hook manages notification state
- Local component state for form inputs and UI feedback
- No global state library needed for this scope

### API Layer

- Centralized Axios instance with base URL config
- Separate functions for each API endpoint
- Console logging for frontend debugging

## Logging Architecture

### Logging Flow

```
Application Code --> Logger Utility --> Axios --> Evaluation Service API
```

### Log Structure

Every log entry contains:
- `stack` - backend or frontend
- `level` - debug, info, warn, error, fatal
- `package` - which layer generated the log
- `message` - human readable description

### Logging Rules by Layer

- **Controller**: INFO for successful operations, ERROR for failures
- **Service**: INFO for business logic events, ERROR for exceptions
- **Repository**: ERROR only (data access failures)
- **Middleware**: INFO for request tracking, ERROR for unhandled errors
- **Validation**: WARN for validation failures

## Error Handling

### Backend
- Validation middleware returns 400 with specific error messages
- Controllers catch errors and forward to error middleware
- Error middleware logs and returns structured error response
- Dev mode includes stack traces

### Frontend
- API errors caught and displayed as MUI Alert components
- Loading states shown with CircularProgress
- Empty states handled with helpful messages
- Success feedback with auto-dismiss

## Security

- Helmet for HTTP security headers
- CORS enabled for cross-origin requests
- Input validation on POST endpoints
- Environment variables for sensitive config
