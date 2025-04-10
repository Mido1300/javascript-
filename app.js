import {
    processUserData,
    fetchUserPosts,
    createUserProfileHTML,
    createStateManager,
} from './userProfile.js';
import { users, sampleUser } from './users.js';

// Users table
const processedUsers = processUserData(users);
const usersTable = document.getElementById('processed-users');
processedUsers.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td><button class="action-btn" onclick="alert('Viewing ${user.fullName}\'s profile')">View</button></td>
    `;
    usersTable.appendChild(row);
});

// Posts feed
const postsList = document.getElementById('user-posts');
fetchUserPosts(1).then((titles) => {
    titles.slice(0, 5).forEach((title, index) => { // Limited to 5 for better layout
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${index + 1}. ${title.substring(0, 50)}${title.length > 50 ? '...' : ''}</span>
            <button class="action-btn small">Like</button>
        `;
        postsList.appendChild(li);
    });
});

// Profile display
document.getElementById('user-profile').innerHTML = createUserProfileHTML(sampleUser);

// State management
const stateElements = {
    initial: document.getElementById('initial-state'),
    current: document.getElementById('current-state')
};
const userState = createStateManager({ name: 'Alex', status: 'Inactive' });
stateElements.initial.textContent = JSON.stringify(userState.getState(), null, 2);
stateElements.current.textContent = JSON.stringify(userState.getState(), null, 2);

userState.subscribe((state) => {
    stateElements.current.textContent = JSON.stringify(state, null, 2);
});

setTimeout(() => userState.setState({ status: 'Active' }), 1000);
setTimeout(() => userState.setState({ lastSeen: new Date().toLocaleString() }), 2000);

// Logs
const consoleOutput = document.getElementById('console-output');
const log = (message) => consoleOutput.textContent += `${new Date().toLocaleTimeString()} - ${message}\n`;

log('Initialized dashboard');
log('Users loaded: ' + processedUsers.length + ' active members');
fetchUserPosts(1)
    .then((titles) => log('Loaded ' + titles.length + ' posts'))
    .catch((error) => log('Error: ' + error));
log('Profile rendered: ' + sampleUser.fullName);
userState.subscribe((state) => log('State update: ' + JSON.stringify(state)));
