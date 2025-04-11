// Export updated users details
export const users = [
  {
    id: 1,
    firstName: 'Alexandra',
    lastName: 'Reynolds',
    email: 'alex.reynolds@techcorp.com',
    isActive: true,
    role: 'Senior Developer',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    engagement: 'High',
    lastLogin: '2025-04-10T08:45:22Z',
    department: 'Engineering'
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@techcorp.com',
    isActive: false,
    role: 'UX Designer',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    engagement: 'Medium',
    lastLogin: '2025-03-28T14:22:10Z',
    department: 'Design'
  },
  {
    id: 3,
    firstName: 'Sophia',
    lastName: 'Garcia',
    email: 'sophia.garcia@techcorp.com',
    isActive: true,
    role: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    engagement: 'Very High',
    lastLogin: '2025-04-11T07:15:46Z',
    department: 'Product'
  },
  {
    id: 4,
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@techcorp.com',
    isActive: true,
    role: 'Backend Developer',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    engagement: 'High',
    lastLogin: '2025-04-10T16:30:00Z',
    department: 'Engineering'
  },
  {
    id: 5,
    firstName: 'Olivia',
    lastName: 'Martinez',
    email: 'olivia.martinez@techcorp.com',
    isActive: true,
    role: 'Data Scientist',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    engagement: 'Medium',
    lastLogin: '2025-04-09T11:20:15Z',
    department: 'Data Analytics'
  }
];

export const sampleUser = {
  id: 3,
  firstName: 'Sophia',
  lastName: 'Garcia',
  email: 'sophia.garcia@techcorp.com',
  avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  isActive: true,
  role: 'Product Manager',
  department: 'Product',
  engagement: 'Very High',
  joinDate: '2023-06-15',
  projectsCompleted: 24,
  skills: ['Product Strategy', 'Team Leadership', 'Agile Methodologies'],
  phoneNumber: '(555) 123-4567',
  location: 'San Francisco, CA'
};

// Advanced user data functionality
export class UserProfileManager {
  constructor(users) {
    this.users = users;
    this.initTimestamp = new Date().toISOString();
    
    // Log initialization
    console.group('🔍 User Profile Manager Initialized');
    console.log(`⏰ Timestamp: ${this.initTimestamp}`);
    console.log(`👥 Users loaded: ${users.length}`);
    console.table(users.map(user => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      status: user.isActive ? 'Active' : 'Inactive',
      department: user.department
    })));
    console.groupEnd();
  }
  
  getUser
