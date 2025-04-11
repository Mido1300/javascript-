import { formatTeamData } from './dataFormatter.js';
import { getTeamProjects } from './projectFetcher.js';
import { generateLeadProfileHTML } from './profileGenerator.js';
import { createStatusTracker } from './statusTracker.js';
import { teamMembers, teamLead } from './teamData.js';

// Display team members
const activeMembers = formatTeamData(teamMembers);
const activeMembersTable = document.getElementById('active-members');
activeMembers.forEach((member) => {
  const row = document.createElement('tr');
  row.innerHTML = `
                <td>${member.id}</td>
                <td>${member.fullName}</td>
                <td>${member.email}</td>
            `;
  activeMembersTable.appendChild(row);
});

// Display team projects
const teamProjectsList = document.getElementById('team-projects');
getTeamProjects(3).then((projects) => {
  projects.forEach((project) => {
    const li = document.createElement('li');
    li.textContent = project;
    teamProjectsList.appendChild(li);
  });
});

// Display team lead profile
document.getElementById('lead-profile').innerHTML =
  generateLeadProfileHTML(teamLead);

// Status management
const initialStatusElement = document.getElementById('initial-status');
const currentStatusElement = document.getElementById('current-status');
const teamStatus = createStatusTracker({ name: 'Alex', online: false });
initialStatusElement.textContent = JSON.stringify(teamStatus.getState(), null, 2);
currentStatusElement.textContent = JSON.stringify(teamStatus.getState(), null, 2);
teamStatus.subscribe((state) => {
  currentStatusElement.textContent = JSON.stringify(state, null, 2);
});

// Simulate status changes
setTimeout(() => teamStatus.setState({ online: true }), 1000);
setTimeout(() => teamStatus.setState({ lastActive: '2025-04-10' }), 2000);

// Console output
const consoleOutput = document.getElementById('console-output');
function logToScreen(message) {
  const timestamp = new Date().toLocaleTimeString();
  consoleOutput.textContent += `[${timestamp}] ${message}\n`;
}

logToScreen('📊 Team Data Processed: ' + activeMembers.length + ' active members');
getTeamProjects(3)
  .then((projects) => logToScreen('📝 Projects Retrieved: ' + projects.length))
  .catch((error) => logToScreen('❌ Error: Failed to fetch projects'));
logToScreen('👤 Lead Profile Generated for: ' + teamLead.firstName + ' ' + teamLead.lastName);
logToScreen('⚙️ Status Tracker Initialized');
teamStatus.subscribe((state) => {
  const changes = Object.keys(state).join(', ');
  logToScreen(`🔄 Status Updated: ${changes}`);
});
