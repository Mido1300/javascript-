import {
    processUserData,
    fetchUserPosts,
    createUserProfileHTML,
    createStateManager,
} from './userProfile.js';
import { users, sampleUser } from './users.js';

// Daily tasks data
const dailyTasks = {
    1: ['ES6+ features', 'Arrow functions', 'Destructuring', 'Promises', 'Async/await'],
    2: ['JSX', 'Components', 'Props', 'State', 'Component lifecycle'],
    3: ['useState', 'useEffect', 'useContext', 'useReducer', 'Custom hooks'],
    4: ['Composition', 'HOCs', 'Render props', 'Controlled components'],
    5: ['React Router', 'Navigation patterns', 'Route protection'],
    6: ['Form events', 'Controlled inputs', 'Validation', 'Error handling'],
    7: ['Fetch API', 'Axios', 'Loading states', 'Data transformation'],
    8: ['SSR', 'SSG', 'File-based routing', 'API routes'],
    9: ['TypeScript basics', 'Typing props', 'Typing hooks', 'Typing events'],
    10: ['Context API', 'Redux', 'State management strategies']
};

// Team members with view functionality
const processedUsers = processUserData(users);
const usersTable = document.getElementById('processed-users');
let currentFeaturedUser = sampleUser;

processedUsers.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td><button class="action-btn view-btn" data-index="${index}">View</button></td>
    `;
    usersTable.appendChild(row);
});

// Daily tasks display
const postsList = document.getElementById('user-posts');
function displayTasks(day) {
    postsList.innerHTML = '';
    const tasks = dailyTasks[day] || [];
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${index + 1}. ${task}</span>
            <button class="action-btn small">Complete</button>
        `;
        postsList.appendChild(li);
    });
}

// Day navigation
document.querySelectorAll('.day-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const day = e.target.getAttribute('data-day');
        displayTasks(day);
        log(`Switched to Day ${day} tasks`);
        
        // Remove active class from all buttons and add to clicked one
        document.querySelectorAll('.day-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// Initial display (Day 1)
displayTasks(1);
document.querySelector('.day-btn[data-day="1"]').classList.add('active');

// Featured member initial display
const profileDisplay = document.getElementById('user-profile');
profileDisplay.innerHTML = createUserProfileHTML(currentFeaturedUser);

// Update featured member on view click
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        const selectedUser = processedUsers[index];
        currentFeaturedUser = {
            id: selectedUser.id,
            first: selectedUser.fullName.split(' ')[0],
            last: selectedUser.fullName.split(' ')[1],
            email: selectedUser.email,
            position: 'Team Member',
            active: true,
            fullName: selectedUser.fullName
        };
        profileDisplay.innerHTML = createUserProfileHTML(currentFeaturedUser);
        log(`Featured member updated: ${currentFeaturedUser.fullName}`);
    });
});

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

// System logs
const consoleOutput = document.getElementById('console-output');
const log = (message) => {
    consoleOutput.textContent += `${new Date().toLocaleTimeString()} - ${message}\n`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
};

log('System initialized');
log(`Loaded ${processedUsers.length} active team members`);
log(`Profile displayed: ${currentFeaturedUser.fullName}`);
userState.subscribe((state) => log(`Status updated: ${JSON.stringify(state)}`));

// Refresh button
document.querySelector('.refresh-btn').addEventListener('click', () => {
    log('Data refreshed');
    const activeDay = document.querySelector('.day-btn.active')?.getAttribute('data-day') || '1';
    displayTasks(activeDay);
    log(`Refreshed Day ${activeDay} tasks`);
});
