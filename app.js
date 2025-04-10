import {
    processUserData,
    fetchUserPosts,
    createUserProfileHTML,
    createStateManager,
} from './userProfile.js';
import { users, sampleUser } from './users.js';

// Team table
const processedUsers = processUserData(users);
const usersTable = document.getElementById('processed-users');
processedUsers.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td><button class="action-btn" onclick="alert('Viewing ${user.fullName}\'s details')">Details</button></td>
    `;
    usersTable.appendChild(row);
});

// Activity feed
const postsList = document.getElementById('user-posts');
fetchUserPosts(1).then((titles) => {
    titles.slice(0, 6).forEach((title, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${index + 1}. ${title.substring(0, 40)}${title.length > 40 ? '...' : ''}</span>
            <button class="action-btn small">Comment</button>
        `;
        postsList.appendChild(li);
    });
});

// Profile
document.getElementById('user-profile').innerHTML = createUserProfileHTML(sampleUser);

// Status monitor
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
const log = (message) => {
    consoleOutput.textContent += `${new Date().toLocaleTimeString()} - ${message}\n`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
};

log('Dashboard initialized');
log(`Loaded ${processedUsers.length} team members`);
fetchUserPosts(1)
    .then((titles) => log(`Fetched ${titles.length} activities`))
    .catch((error) => log(`Error: ${error}`));
log(`Profile loaded: ${sampleUser.fullName}`);
userState.subscribe((state) => log(`Status: ${JSON.stringify(state)}`));

// Refresh button
document.querySelector('.refresh-btn').addEventListener('click', () => {
    log('Dashboard refreshed');
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
});
