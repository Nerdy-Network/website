// API service layer for Firebase operations
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  increment,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

// ============================================================================
// GENERAL INFORMATION API
// ============================================================================

export const getStats = async () => {
  try {
    const statsDoc = await getDoc(doc(db, 'stats', 'platform'));
    if (statsDoc.exists()) {
      return statsDoc.data();
    }
    // Return default stats if document doesn't exist
    return {
      members: 0,
      projects: 0,
      collaborations: 0,
      countries: 0
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export const submitContactForm = async (contactData) => {
  try {
    await addDoc(collection(db, 'contacts'), {
      ...contactData,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const subscribeToNewsletter = async (email) => {
  try {
    await addDoc(collection(db, 'newsletter_subscriptions'), {
      email,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

// ============================================================================
// COMMUNITY API
// ============================================================================

export const getUsers = async (filters = {}) => {
  try {
    let q = collection(db, 'users');
    
    // Apply filters
    if (filters.skills && filters.skills.length > 0) {
      q = query(q, where('skills', 'array-contains-any', filters.skills));
    }
    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }
    if (filters.verified !== undefined) {
      q = query(q, where('verified', '==', filters.verified));
    }
    
    // Add ordering and pagination
    q = query(q, orderBy('createdAt', 'desc'));
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const getProjects = async (filters = {}) => {
  try {
    let q = collection(db, 'projects');
    
    // Apply filters
    if (filters.tags && filters.tags.length > 0) {
      q = query(q, where('tags', 'array-contains-any', filters.tags));
    }
    if (filters.featured !== undefined) {
      q = query(q, where('featured', '==', filters.featured));
    }
    if (filters.authorId) {
      q = query(q, where('authorId', '==', filters.authorId));
    }
    
    // Add ordering and pagination
    q = query(q, orderBy('createdAt', 'desc'));
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const createProject = async (projectData, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      authorId: userId,
      likes: 0,
      commentsCount: 0,
      stars: 0,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const likeProject = async (projectId) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      likes: increment(1)
    });
  } catch (error) {
    console.error('Error liking project:', error);
    throw error;
  }
};

// ============================================================================
// ECOSYSTEM API
// ============================================================================

export const getBounties = async (filters = {}) => {
  try {
    let q = collection(db, 'bounties');
    
    // Apply filters
    if (filters.difficulty) {
      q = query(q, where('difficulty', '==', filters.difficulty));
    }
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    // Add ordering and pagination
    q = query(q, orderBy('createdAt', 'desc'));
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching bounties:', error);
    throw error;
  }
};

export const createBounty = async (bountyData, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'bounties'), {
      ...bountyData,
      creatorId: userId,
      status: 'open',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating bounty:', error);
    throw error;
  }
};

export const getQuests = async (userId) => {
  try {
    const q = query(collection(db, 'quests'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching quests:', error);
    throw error;
  }
};

export const getBadges = async () => {
  try {
    const q = query(collection(db, 'badges'), orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching badges:', error);
    throw error;
  }
};

// ============================================================================
// HUB API
// ============================================================================

export const getHubProjects = async (userId) => {
  try {
    const q = query(
      collection(db, 'hub_projects'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching hub projects:', error);
    throw error;
  }
};

export const createHubProject = async (projectData, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'hub_projects'), {
      ...projectData,
      ownerId: userId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating hub project:', error);
    throw error;
  }
};

export const getProjectFiles = async (projectId) => {
  try {
    const q = query(
      collection(db, 'hub_projects', projectId, 'files'),
      orderBy('path')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching project files:', error);
    throw error;
  }
};

export const updateFileContent = async (projectId, fileId, content) => {
  try {
    const fileRef = doc(db, 'hub_projects', projectId, 'files', fileId);
    await updateDoc(fileRef, {
      content,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating file:', error);
    throw error;
  }
};

export const getProjectTasks = async (projectId) => {
  try {
    const q = query(
      collection(db, 'hub_projects', projectId, 'tasks'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    throw error;
  }
};

export const createTask = async (projectId, taskData) => {
  try {
    const docRef = await addDoc(collection(db, 'hub_projects', projectId, 'tasks'), {
      ...taskData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// ============================================================================
// REAL-TIME SUBSCRIPTIONS
// ============================================================================

export const subscribeToProjectChat = (projectId, callback) => {
  const q = query(
    collection(db, 'hub_projects', projectId, 'chat'),
    orderBy('createdAt', 'asc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  });
};

export const sendChatMessage = async (projectId, message, userId) => {
  try {
    await addDoc(collection(db, 'hub_projects', projectId, 'chat'), {
      authorId: userId,
      content: message,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// ============================================================================
// FILE UPLOAD API
// ============================================================================

export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
