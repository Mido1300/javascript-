export function processUserData(users) {
    return users
        .filter(user => user.active)
        .map(user => ({
            id: user.id,
            fullName: `${user.first} ${user.last}`,
            email: user.email
        }))
        .sort((a, b) => a.fullName.localeCompare(b.fullName));
}

export async function fetchUserPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) throw new Error('Network error');
    const posts = await response.json();
    return posts.map(post => post.title);
}

export function createUserProfileHTML(user) {
    const statusClass = user.active ? 'status-active' : 'status-inactive';
    return `
        <div class="profile-card">
            <img src="https://i.pravatar.cc/150?img=${user.id}" alt="${user.fullName}" class="profile-pic ${statusClass}">
            <div class="profile-info">
                <h3>${user.first} ${user.last}</h3>
                <p>${user.email}</p>
                <p>Position: ${user.position}</p>
                <span class="status ${statusClass}">${user.active ? 'Active' : 'Inactive'}</span>
                <button class="action-btn toggle-status-btn" data-active="${user.active}">${user.active ? 'Deactivate' : 'Activate'}</button>
            </div>
            <button class="action-btn message-btn ${statusClass}">Message</button>
        </div>
    `;
}

export function createStateManager(initialState) {
    let state = { ...initialState };
    const subscribers = [];
    return {
        getState: () => ({ ...state }),
        setState: (newState) => {
            state = { ...state, ...newState };
            subscribers.forEach(cb => cb(state));
        },
        subscribe: (cb) => {
            subscribers.push(cb);
            return () => subscribers.splice(subscribers.indexOf(cb), 1);
        }
    };
}
