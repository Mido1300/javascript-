import {
    processUserData,
    fetchUserPosts,
    createUserProfileHTML,
    createStateManager,
} from './userProfile.js';
import { users, sampleUser } from './users.js';

// Process and display users
const processedUsers = processUserData(users);
const usersTable = document.getElementById('processed-users');
processedUsers.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td><button class="action-btn" onclick="alert('Viewing ${user.fullName}')">View</button></td>
    `;
    usersTable.appendChild(row);
});

// Display posts
const postsList = document.getElementById('user-posts');
fetchUserPosts(1).then((titles) => {
    titles.forEach((title, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="post-item">
                <span>${index + 1}. ${title}</span>
                <button class="action-btn small">Like</button>
            </div>
        `;
        postsList.appendChild(li);
    });
});

// Display profile
document.getElementById('user-profile').innerHTML = createUserProfileHTML(sampleUser);

// State management
const stateElements = {
    initial: document.getElementById('initial-state'),
    current: document.getElementById('current-state')
};
const userState = createStateManager({ name: 'Alex', status: 'Inactive' }); // Changed from 'offline' to 'Inactive'
stateElements.initial.textContent = JSON.stringify(userState.getState(), null, 2);
stateElements.current.textContent = JSON.stringify(userState.getState(), null, 2);

userState.subscribe((state) => {
    stateElements.current.textContent = JSON.stringify(state, null, 2);
});

// Simulate state updates
setTimeout(() => userState.setState({ status: 'Active' }), 1000); // Changed from 'online' to 'Active'
setTimeout(() => userState.setState({ lastSeen: new Date().toISOString() }), 2000);

// Logging
const consoleOutput = document.getElementById('console-output');
const log = (message) => consoleOutput.textContent += `${new Date().toLocaleTimeString()} - ${message}\n`;

log('Users loaded: ' + JSON.stringify(processedUsers, null, 2));
fetchUserPosts(1)
    .then((titles) => log('Posts fetched: ' + titles.length + ' items'))
    .catch((error) => log('Fetch error: ' + error));
log('Profile rendered for: ' + sampleUser.fullName);
userState.subscribe((state) => log('Status updated: ' + JSON.stringify(state)));
