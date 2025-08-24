# The Nerdy Network - API Endpoints Documentation

This document outlines all the API endpoints that The Nerdy Network frontend will interact with across all phases of the platform.

## Base URL
```
https://api.nerdynetwork.com/v1
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## Phase 1: Professional Website API

### General Information
- **GET** `/info/stats` - Get platform statistics (members, projects, collaborations, countries)
- **GET** `/info/featured-jobs` - Get featured job opportunities for homepage
- **POST** `/contact` - Submit contact form
- **POST** `/newsletter/subscribe` - Subscribe to newsletter

---

## Phase 2: Job Board API

### Jobs
- **GET** `/jobs` - Get paginated list of jobs
  - Query params: `page`, `limit`, `search`, `type`, `location`, `remote`, `featured`
- **GET** `/jobs/:id` - Get specific job details
- **POST** `/jobs/:id/apply` - Apply for a job (protected)
- **POST** `/jobs/:id/bookmark` - Bookmark a job (protected)
- **DELETE** `/jobs/:id/bookmark` - Remove bookmark (protected)
- **GET** `/jobs/bookmarked` - Get user's bookmarked jobs (protected)

### Job Categories & Filters
- **GET** `/jobs/categories` - Get job categories
- **GET** `/jobs/locations` - Get available job locations
- **GET** `/jobs/companies` - Get companies posting jobs
- **GET** `/jobs/skills` - Get required skills/technologies

---

## Phase 3: Community API

### Users/Members
- **GET** `/users` - Get paginated list of community members
  - Query params: `page`, `limit`, `search`, `skills`, `location`, `verified`
- **GET** `/users/:id` - Get specific user profile
- **PUT** `/users/profile` - Update user profile (protected)
- **POST** `/users/:id/connect` - Send connection request (protected)
- **POST** `/users/:id/message` - Send direct message (protected)

### Projects
- **GET** `/projects` - Get community projects
  - Query params: `page`, `limit`, `search`, `tags`, `featured`, `author`
- **GET** `/projects/:id` - Get specific project details
- **POST** `/projects` - Create new project (protected)
- **PUT** `/projects/:id` - Update project (protected)
- **POST** `/projects/:id/like` - Like a project (protected)
- **POST** `/projects/:id/comment` - Comment on project (protected)
- **GET** `/projects/:id/comments` - Get project comments

### Community Stats
- **GET** `/community/stats` - Get community statistics
- **GET** `/community/skills` - Get popular skills in community

---

## Phase 4: Ecosystem API

### Opportunity Feed
- **GET** `/feed/opportunities` - Get personalized opportunity feed (protected)
- **POST** `/feed/opportunities/:id/action` - Take action on opportunity (protected)

### Bounties
- **GET** `/bounties` - Get active bounties
  - Query params: `page`, `limit`, `difficulty`, `category`, `reward_min`, `reward_max`
- **GET** `/bounties/:id` - Get specific bounty details
- **POST** `/bounties` - Create new bounty (protected)
- **POST** `/bounties/:id/apply` - Apply for bounty (protected)
- **PUT** `/bounties/:id/status` - Update bounty status (protected)

### Quests & Badges
- **GET** `/quests` - Get available quests (protected)
- **GET** `/quests/active` - Get user's active quests (protected)
- **POST** `/quests/:id/join` - Join a quest (protected)
- **PUT** `/quests/:id/progress` - Update quest progress (protected)
- **GET** `/badges` - Get all available badges
- **GET** `/badges/earned` - Get user's earned badges (protected)

### Reverse Job Board
- **POST** `/talent-profile` - Create/update talent profile (protected)
- **GET** `/talent-profile` - Get user's talent profile (protected)
- **GET** `/talent-matches` - Get companies interested in user (protected)

---

## Phase 5: Hub API

### Projects Management
- **GET** `/hub/projects` - Get user's projects (protected)
- **POST** `/hub/projects` - Create new project (protected)
- **GET** `/hub/projects/:id` - Get project details (protected)
- **PUT** `/hub/projects/:id` - Update project (protected)
- **DELETE** `/hub/projects/:id` - Delete project (protected)

### Code & Files
- **GET** `/hub/projects/:id/files` - Get project file structure (protected)
- **GET** `/hub/projects/:id/files/*` - Get specific file content (protected)
- **PUT** `/hub/projects/:id/files/*` - Update file content (protected)
- **POST** `/hub/projects/:id/files` - Create new file (protected)
- **DELETE** `/hub/projects/:id/files/*` - Delete file (protected)

### Collaboration
- **GET** `/hub/projects/:id/members` - Get project members (protected)
- **POST** `/hub/projects/:id/members` - Add project member (protected)
- **DELETE** `/hub/projects/:id/members/:userId` - Remove member (protected)
- **PUT** `/hub/projects/:id/members/:userId/role` - Update member role (protected)

### Tasks
- **GET** `/hub/projects/:id/tasks` - Get project tasks (protected)
- **POST** `/hub/projects/:id/tasks` - Create new task (protected)
- **PUT** `/hub/tasks/:id` - Update task (protected)
- **DELETE** `/hub/tasks/:id` - Delete task (protected)

### Chat
- **GET** `/hub/projects/:id/messages` - Get project chat messages (protected)
- **POST** `/hub/projects/:id/messages` - Send message (protected)
- **WebSocket** `/hub/projects/:id/chat` - Real-time chat connection (protected)

### Deployment
- **POST** `/hub/projects/:id/deploy` - Deploy project (protected)
- **GET** `/hub/projects/:id/deployments` - Get deployment history (protected)
- **GET** `/hub/projects/:id/deployments/:deployId` - Get deployment details (protected)

### Version Control
- **GET** `/hub/projects/:id/commits` - Get commit history (protected)
- **POST** `/hub/projects/:id/commits` - Create new commit (protected)
- **GET** `/hub/projects/:id/branches` - Get branches (protected)
- **POST** `/hub/projects/:id/branches` - Create new branch (protected)

---

## Authentication API

### Auth
- **POST** `/auth/register` - Register new user
- **POST** `/auth/login` - Login user
- **POST** `/auth/logout` - Logout user (protected)
- **POST** `/auth/refresh` - Refresh JWT token
- **POST** `/auth/forgot-password` - Request password reset
- **POST** `/auth/reset-password` - Reset password with token
- **GET** `/auth/verify-email/:token` - Verify email address
- **POST** `/auth/resend-verification` - Resend verification email

### OAuth
- **GET** `/auth/github` - GitHub OAuth login
- **GET** `/auth/google` - Google OAuth login
- **GET** `/auth/linkedin` - LinkedIn OAuth login

---

## User Management API

### Profile
- **GET** `/user/profile` - Get current user profile (protected)
- **PUT** `/user/profile` - Update user profile (protected)
- **POST** `/user/avatar` - Upload avatar (protected)
- **GET** `/user/settings` - Get user settings (protected)
- **PUT** `/user/settings` - Update user settings (protected)

### Connections
- **GET** `/user/connections` - Get user connections (protected)
- **GET** `/user/connection-requests` - Get pending connection requests (protected)
- **POST** `/user/connection-requests/:id/accept` - Accept connection request (protected)
- **POST** `/user/connection-requests/:id/decline` - Decline connection request (protected)

---

## Notifications API

### Notifications
- **GET** `/notifications` - Get user notifications (protected)
- **PUT** `/notifications/:id/read` - Mark notification as read (protected)
- **PUT** `/notifications/read-all` - Mark all notifications as read (protected)
- **DELETE** `/notifications/:id` - Delete notification (protected)
- **WebSocket** `/notifications` - Real-time notifications (protected)

---

## Search API

### Global Search
- **GET** `/search` - Global search across jobs, users, projects
  - Query params: `q`, `type`, `page`, `limit`
- **GET** `/search/suggestions` - Get search suggestions
- **POST** `/search/save` - Save search query (protected)
- **GET** `/search/saved` - Get saved searches (protected)

---

## Analytics API

### User Analytics
- **GET** `/analytics/dashboard` - Get user dashboard analytics (protected)
- **GET** `/analytics/profile-views` - Get profile view statistics (protected)
- **GET** `/analytics/project-stats` - Get project statistics (protected)

---

## File Upload API

### File Management
- **POST** `/upload/image` - Upload image file (protected)
- **POST** `/upload/document` - Upload document file (protected)
- **POST** `/upload/project-asset` - Upload project asset (protected)
- **DELETE** `/upload/:fileId` - Delete uploaded file (protected)

---

## WebSocket Events

### Real-time Features
- **Connection**: `/ws` - Main WebSocket connection (protected)
- **Events**:
  - `project_update` - Project changes
  - `new_message` - New chat message
  - `task_update` - Task status changes
  - `member_online` - Member online status
  - `deployment_status` - Deployment progress
  - `notification` - New notification

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details (optional)"
  }
}
```

### Common Error Codes
- `UNAUTHORIZED` - 401: Authentication required
- `FORBIDDEN` - 403: Insufficient permissions
- `NOT_FOUND` - 404: Resource not found
- `VALIDATION_ERROR` - 422: Invalid input data
- `RATE_LIMITED` - 429: Too many requests
- `SERVER_ERROR` - 500: Internal server error

---

## Rate Limiting

- **General API**: 1000 requests per hour per user
- **Search API**: 100 requests per minute per user
- **Upload API**: 50 requests per hour per user
- **WebSocket**: 10 connections per user

---

## Pagination

All paginated endpoints use consistent pagination:

```json
{
  "data": [...],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## Data Models

### User
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "name": "string",
  "avatar": "string",
  "bio": "string",
  "location": "string",
  "skills": ["string"],
  "verified": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Job
```json
{
  "id": "string",
  "title": "string",
  "company": "string",
  "description": "string",
  "location": "string",
  "type": "string",
  "salary": "string",
  "tags": ["string"],
  "featured": "boolean",
  "remote": "boolean",
  "created_at": "datetime"
}
```

### Project
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "author": "User",
  "tags": ["string"],
  "likes": "number",
  "comments": "number",
  "stars": "number",
  "featured": "boolean",
  "created_at": "datetime"
}
```

This API documentation provides a comprehensive foundation for implementing The Nerdy Network backend services that will power all the UI components across all five phases of the platform.

