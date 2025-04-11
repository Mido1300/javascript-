// Team Data Module
export const teamMembers = [
  {
    id: 101,
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex.rivera@company.io',
    isActive: true,
  },
  {
    id: 102,
    firstName: 'Morgan',
    lastName: 'Chen',
    email: 'morgan.chen@company.io',
    isActive: false,
  },
  {
    id: 103,
    firstName: 'Taylor',
    lastName: 'Wilson',
    email: 'taylor.wilson@company.io',
    isActive: true,
  },
  {
    id: 104,
    firstName: 'Jamie',
    lastName: 'Patel',
    email: 'jamie.patel@company.io',
    isActive: true,
  },
];

export const teamLead = {
  id: 101,
  firstName: 'Alex',
  lastName: 'Rivera',
  email: 'alex.rivera@company.io',
  avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
  isActive: true,
  position: 'Senior Designer',
};

const logTeamMembers = () => {
  teamMembers.forEach(member => {
    const fullName = `${member.firstName} ${member.lastName}`;
    const status = member.isActive ? 'Active' : 'Inactive';
    console.group(`Member: ${fullName}`);
    console.log(`ID: ${member.id}`);
    console.log(`Email: ${member.email}`);
    console.log(`Status: ${status}`);
    console.groupEnd();
  });
};

logTeamMembers();
