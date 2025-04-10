// Day 1: Modern JavaScript Essentials
// Demonstrates ES6+ features, arrow functions, destructuring, promises, async/await
// Assessment: JavaScript fundamentals with practical React-like patterns

import { users } from './users.js';

// Part 1: Data Transformation with ES6+ Features
// Using arrow functions, destructuring, and array methods
const processUserData = (users) => {
    return users
        .filter(({ active }) => active) // Destructuring to filter active users
        .map(({ id, first, last, email }) => ({
            id,
            fullName: `${first} ${last}`,
            email
        }))
        .sort((a, b) => a.fullName.localeCompare(b.fullName));
};

// Part 2: Async Data Fetching with Promises and Async/Await
const fetchUserPosts = async (userId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) throw new Error('Network error');
        const posts = await response.json();
        return posts.map(({ title }) => title); // Destructuring to extract titles
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

// Part 3: State Management with Closure and ES6
const createStateManager = (initialState) => {
    let state = { ...initialState }; // Spread operator for shallow copy
    const subscribers = [];

    return {
        getState: () => ({ ...state }), // Returns a new object
        setState: (newState) => {
            state = { ...state, ...newState }; // Merging state with spread
            subscribers.forEach(callback => callback(state));
        },
        subscribe: (callback) => {
            subscribers.push(callback);
            return () => subscribers.splice(subscribers.indexOf(callback), 1); // Unsubscribe function
        }
    };
};

// Practical Exercises Simulating React-like Patterns
// Data Transformation
const processedUsers = processUserData(users);
console.log('Processed Users:', processedUsers);

// Async Data Fetching
fetchUserPosts(1)
    .then(titles => console.log('User Posts:', titles))
    .catch(error => console.error('Error:', error));

// State Management
const userState = createStateManager({ name: 'Alex', status: 'Inactive' });
console.log('Initial State:', userState.getState());

userState.subscribe((state) => console.log('State Updated:', state));
userState.setState({ status: 'Active' });
userState.setState({ lastSeen: new Date().toLocaleString() });
