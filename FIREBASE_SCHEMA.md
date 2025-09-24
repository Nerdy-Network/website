# Firebase Firestore Database Schema

This document outlines the Firestore database schema for The Nerdy Network backend, based on the project requirements and API endpoints. This schema is designed to be scalable and efficient for the application's needs.

## Data Models

### Root Collections

- **users**: Stores user profile information.
- **projects**: Stores community-shared projects.
- **bounties**: Stores bounty information for the ecosystem.
- **quests**: Stores available quests for users.
- **badges**: Stores all available badges.
- **hub_projects**: Stores user-specific projects for the Hub.
- **notifications**: Stores notifications for users.
- **stats**: A single document to store platform-wide statistics.
- **contacts**: Stores contact form submissions.
- **newsletter_subscriptions**: Stores email addresses for the newsletter.

---

## Collection Schemas

### `users`

Stores public user profile information.

**Document ID**: `userId` (from Firebase Authentication)

| Field | Type | Description |
|---|---|---|
| `username` | `string` | Unique username. |
| `email` | `string` | User's email address. |
| `name` | `string` | User's full name. |
| `avatar` | `string` | URL to the user's avatar image. |
| `bio` | `string` | Short user biography. |
| `location` | `string` | User's location. |
| `skills` | `array` | Array of user's skills. |
| `verified` | `boolean` | Whether the user is verified. |
| `createdAt` | `timestamp` | Timestamp of account creation. |
| `updatedAt` | `timestamp` | Timestamp of last profile update. |

#### Subcollections of `users`

- **`connections`**: Stores information about user connections.
  - **Document ID**: `connectionId`
  - **Fields**: `userId`, `status` (`pending`, `accepted`, `declined`), `createdAt`
- **`settings`**: Stores user-specific settings.
  - **Document ID**: `userId`
  - **Fields**: `theme`, `notifications`, etc.
- **`talent_profile`**: Stores the user's talent profile for the reverse job board.
  - **Document ID**: `userId`
  - **Fields**: `availability`, `desired_roles`, `portfolio`, etc.

### `projects`

Stores community-shared projects.

**Document ID**: `projectId`

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Project title. |
| `description` | `string` | Detailed project description. |
| `authorId` | `string` | ID of the user who created the project. |
| `tags` | `array` | Array of project tags. |
| `likes` | `number` | Number of likes. |
| `commentsCount` | `number` | Number of comments. |
| `stars` | `number` | Number of stars. |
| `featured` | `boolean` | Whether the project is featured. |
| `createdAt` | `timestamp` | Timestamp of project creation. |

#### Subcollections of `projects`

- **`comments`**: Stores comments on the project.
  - **Document ID**: `commentId`
  - **Fields**: `authorId`, `content`, `createdAt`

### `hub_projects`

Stores user-specific projects for the Hub.

**Document ID**: `hubProjectId`

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Project name. |
| `ownerId` | `string` | ID of the user who owns the project. |
| `createdAt` | `timestamp` | Timestamp of project creation. |

#### Subcollections of `hub_projects`

- **`files`**: Stores the file structure of the project.
  - **Document ID**: `fileId`
  - **Fields**: `name`, `path`, `content`, `createdAt`, `updatedAt`
- **`members`**: Stores project members and their roles.
  - **Document ID**: `userId`
  - **Fields**: `role` (`owner`, `editor`, `viewer`)
- **`tasks`**: Stores tasks for the project.
  - **Document ID**: `taskId`
  - **Fields**: `title`, `description`, `status`, `assigneeId`, `dueDate`
- **`chat`**: Stores chat messages for the project.
  - **Document ID**: `messageId`
  - **Fields**: `authorId`, `content`, `createdAt`
- **`deployments`**: Stores deployment history.
  - **Document ID**: `deploymentId`
  - **Fields**: `status`, `url`, `createdAt`

---

This schema provides a solid foundation for the backend. I will now proceed with setting up the Firebase project and implementing the core functionality based on this design.

