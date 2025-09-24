import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  orderBy, 
  where, 
  limit 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Custom hook for real-time Firestore data
export const useFirestoreCollection = (collectionName, queryConstraints = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      let q = collection(db, collectionName);
      
      if (queryConstraints.length > 0) {
        q = query(q, ...queryConstraints);
      }

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(documents);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error(`Error fetching ${collectionName}:`, err);
          setError(err);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error(`Error setting up ${collectionName} listener:`, err);
      setError(err);
      setLoading(false);
    }
  }, [collectionName, JSON.stringify(queryConstraints)]);

  return { data, loading, error };
};

// Hook for fetching community projects
export const useProjects = (filters = {}) => {
  const queryConstraints = [];
  
  if (filters.featured) {
    queryConstraints.push(where('featured', '==', true));
  }
  if (filters.authorId) {
    queryConstraints.push(where('authorId', '==', filters.authorId));
  }
  if (filters.tags && filters.tags.length > 0) {
    queryConstraints.push(where('tags', 'array-contains-any', filters.tags));
  }
  
  queryConstraints.push(orderBy('createdAt', 'desc'));
  
  if (filters.limit) {
    queryConstraints.push(limit(filters.limit));
  }

  return useFirestoreCollection('projects', queryConstraints);
};

// Hook for fetching community users
export const useUsers = (filters = {}) => {
  const queryConstraints = [];
  
  if (filters.verified !== undefined) {
    queryConstraints.push(where('verified', '==', filters.verified));
  }
  if (filters.skills && filters.skills.length > 0) {
    queryConstraints.push(where('skills', 'array-contains-any', filters.skills));
  }
  if (filters.location) {
    queryConstraints.push(where('location', '==', filters.location));
  }
  
  queryConstraints.push(orderBy('createdAt', 'desc'));
  
  if (filters.limit) {
    queryConstraints.push(limit(filters.limit));
  }

  return useFirestoreCollection('users', queryConstraints);
};

// Hook for fetching bounties
export const useBounties = (filters = {}) => {
  const queryConstraints = [];
  
  if (filters.difficulty) {
    queryConstraints.push(where('difficulty', '==', filters.difficulty));
  }
  if (filters.category) {
    queryConstraints.push(where('category', '==', filters.category));
  }
  if (filters.status) {
    queryConstraints.push(where('status', '==', filters.status));
  }
  
  queryConstraints.push(orderBy('createdAt', 'desc'));
  
  if (filters.limit) {
    queryConstraints.push(limit(filters.limit));
  }

  return useFirestoreCollection('bounties', queryConstraints);
};

// Hook for fetching user's hub projects
export const useHubProjects = (userId) => {
  const queryConstraints = [
    where('ownerId', '==', userId),
    orderBy('createdAt', 'desc')
  ];

  return useFirestoreCollection('hub_projects', queryConstraints);
};

// Hook for fetching project chat messages
export const useProjectChat = (projectId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) return;

    try {
      const q = query(
        collection(db, 'hub_projects', projectId, 'chat'),
        orderBy('createdAt', 'asc')
      );

      const unsubscribe = onSnapshot(q,
        (snapshot) => {
          const chatMessages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setMessages(chatMessages);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error fetching chat messages:', err);
          setError(err);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error('Error setting up chat listener:', err);
      setError(err);
      setLoading(false);
    }
  }, [projectId]);

  return { messages, loading, error };
};

// Hook for fetching project tasks
export const useProjectTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) return;

    try {
      const q = query(
        collection(db, 'hub_projects', projectId, 'tasks'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q,
        (snapshot) => {
          const projectTasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTasks(projectTasks);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error fetching project tasks:', err);
          setError(err);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error('Error setting up tasks listener:', err);
      setError(err);
      setLoading(false);
    }
  }, [projectId]);

  return { tasks, loading, error };
};
