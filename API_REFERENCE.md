# The Nerdy Network - API Reference

This document provides a comprehensive reference for all API endpoints and Firebase integration points for The Nerdy Network platform. This serves as a guide for frontend developers to understand available backend services.

## Firebase Services Overview

The backend is built using Firebase services:
- **Authentication**: User registration, login, and session management
- **Firestore**: NoSQL database for storing application data
- **Storage**: File uploads and media storage
- **Functions**: Server-side logic (optional for advanced features)

## Authentication API

### User Registration
```javascript
// Using Firebase Auth
import { useAuth } from '../contexts/AuthContext.jsx'
const { signup } = useAuth()

await signup(email, password, {
  name: "John Doe",
  username: "johndoe",
  bio: "Full-stack developer",
  location: "San Francisco, CA",
  skills: ["React", "Node.js", "Python"]
})
```

### User Login
```javascript
const { signin } = useAuth()
await signin(email, password)
```

### User Logout
```javascript
const { logout } = useAuth()
await logout()
```

### Password Reset
```javascript
const { resetPassword } = useAuth()
await resetPassword(email)
```

## Community API

### Get Users
```javascript
import { getUsers } from '../services/api.js'

// Get all users
const users = await getUsers()

// Get users with filters
const filteredUsers = await getUsers({
  skills: ['React', 'Node.js'],
  location: 'San Francisco',
  verified: true,
  limit: 20
})
```

### Get User Profile
```javascript
import { getUserById } from '../services/api.js'
const user = await getUserById(userId)
```

### Get Projects
```javascript
import { getProjects } from '../services/api.js'

// Get all projects
const projects = await getProjects()

// Get projects with filters
const filteredProjects = await getProjects({
  tags: ['React', 'AI'],
  featured: true,
  authorId: 'user123',
  limit: 10
})
```

### Create Project
```javascript
import { createProject } from '../services/api.js'

const projectData = {
  title: "AI Chat Bot",
  description: "A smart chatbot using OpenAI API",
  tags: ["AI", "React", "Node.js"],
  featured: false
}

const projectId = await createProject(projectData, currentUser.uid)
```

### Like Project
```javascript
import { likeProject } from '../services/api.js'
await likeProject(projectId)
```

## Ecosystem API

### Get Bounties
```javascript
import { getBounties } from '../services/api.js'

// Get all bounties
const bounties = await getBounties()

// Get bounties with filters
const filteredBounties = await getBounties({
  difficulty: 'Intermediate',
  category: 'Frontend',
  limit: 20
})
```

### Create Bounty
```javascript
import { createBounty } from '../services/api.js'

const bountyData = {
  title: "Build React Component Library",
  description: "Create a reusable component library with TypeScript",
  reward: 500,
  difficulty: "Intermediate",
  category: "Frontend",
  deadline: "2024-02-15",
  tags: ["React", "TypeScript", "UI/UX"]
}

const bountyId = await createBounty(bountyData, currentUser.uid)
```

### Get Quests
```javascript
import { getQuests } from '../services/api.js'
const quests = await getQuests(currentUser.uid)
```

### Get Badges
```javascript
import { getBadges } from '../services/api.js'
const badges = await getBadges()
```

## Hub API

### Get Hub Projects
```javascript
import { getHubProjects } from '../services/api.js'
const hubProjects = await getHubProjects(currentUser.uid)
```

### Create Hub Project
```javascript
import { createHubProject } from '../services/api.js'

const projectData = {
  name: "My Web App",
  description: "A full-stack web application"
}

const projectId = await createHubProject(projectData, currentUser.uid)
```

### Get Project Files
```javascript
import { getProjectFiles } from '../services/api.js'
const files = await getProjectFiles(projectId)
```

### Update File Content
```javascript
import { updateFileContent } from '../services/api.js'
await updateFileContent(projectId, fileId, newContent)
```

### Get Project Tasks
```javascript
import { getProjectTasks } from '../services/api.js'
const tasks = await getProjectTasks(projectId)
```

### Create Task
```javascript
import { createTask } from '../services/api.js'

const taskData = {
  title: "Implement user authentication",
  description: "Add login and registration functionality",
  status: "todo",
  assigneeId: currentUser.uid,
  dueDate: "2024-02-01"
}

const taskId = await createTask(projectId, taskData)
```

### Send Chat Message
```javascript
import { sendChatMessage } from '../services/api.js'
await sendChatMessage(projectId, message, currentUser.uid)
```

## Real-time Subscriptions

### Subscribe to Project Chat
```javascript
import { subscribeToProjectChat } from '../services/api.js'

const unsubscribe = subscribeToProjectChat(projectId, (messages) => {
  console.log('New messages:', messages)
})

// Don't forget to unsubscribe when component unmounts
return () => unsubscribe()
```

### Using Custom Hooks
```javascript
import { useProjectChat, useProjectTasks, useProjects } from '../hooks/useFirestore.js'

// Real-time chat messages
const { messages, loading, error } = useProjectChat(projectId)

// Real-time project tasks
const { tasks, loading, error } = useProjectTasks(projectId)

// Real-time projects with filters
const { data: projects, loading, error } = useProjects({
  featured: true,
  limit: 10
})
```

## General Information API

### Get Platform Stats
```javascript
import { getStats } from '../services/api.js'
const stats = await getStats()
// Returns: { members, projects, collaborations, countries }
```

### Submit Contact Form
```javascript
import { submitContactForm } from '../services/api.js'

const contactData = {
  name: "John Doe",
  email: "john@example.com",
  message: "I have a question about the platform"
}

await submitContactForm(contactData)
```

### Subscribe to Newsletter
```javascript
import { subscribeToNewsletter } from '../services/api.js'
await subscribeToNewsletter(email)
```

## File Upload API

### Upload File
```javascript
import { uploadFile } from '../services/api.js'

const file = event.target.files[0]
const path = `users/${currentUser.uid}/avatar.jpg`
const downloadURL = await uploadFile(file, path)
```

### Delete File
```javascript
import { deleteFile } from '../services/api.js'
await deleteFile(path)
```

## Error Handling

All API functions throw errors that should be caught and handled:

```javascript
try {
  const projects = await getProjects()
  setProjects(projects)
} catch (error) {
  console.error('Error fetching projects:', error)
  // Handle error (show toast, set error state, etc.)
}
```

## Data Models

### User
```javascript
{
  id: "string",
  username: "string",
  email: "string",
  name: "string",
  avatar: "string",
  bio: "string",
  location: "string",
  skills: ["string"],
  verified: boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Project
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authorId: "string",
  tags: ["string"],
  likes: number,
  commentsCount: number,
  stars: number,
  featured: boolean,
  createdAt: Timestamp
}
```

### Bounty
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  creatorId: "string",
  reward: number,
  difficulty: "string",
  category: "string",
  status: "string",
  deadline: "string",
  tags: ["string"],
  createdAt: Timestamp
}
```

### Hub Project
```javascript
{
  id: "string",
  name: "string",
  ownerId: "string",
  description: "string",
  createdAt: Timestamp
}
```

### Task
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  status: "string", // "todo", "in_progress", "done"
  assigneeId: "string",
  dueDate: "string",
  createdAt: Timestamp
}
```

### Chat Message
```javascript
{
  id: "string",
  authorId: "string",
  content: "string",
  createdAt: Timestamp
}
```

## Firebase Configuration

Make sure to configure Firebase in your `src/lib/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  // Your Firebase configuration
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
```

## Security Rules

The Firebase security rules ensure:
- Users can only edit their own profiles
- Projects are readable by all authenticated users
- Hub projects are only accessible by owners and members
- Real-time subscriptions respect the same permissions

## Rate Limiting

Firebase has built-in rate limiting:
- Firestore: 10,000 reads/writes per day (free tier)
- Authentication: 100 sign-ups per hour
- Storage: 1GB storage, 10GB transfer per month

For production, consider upgrading to a paid plan for higher limits.

## Best Practices

1. **Always handle errors** in API calls
2. **Use loading states** for better UX
3. **Implement proper authentication checks** before API calls
4. **Use real-time subscriptions** for collaborative features
5. **Optimize queries** with proper indexing
6. **Cache data** when appropriate to reduce API calls
7. **Validate data** on both client and server side

This API reference provides all the endpoints and integration points needed to build a fully functional frontend for The Nerdy Network platform.
