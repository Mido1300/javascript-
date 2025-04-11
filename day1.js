// Data Transformation Exercise
// This module demonstrates modern JavaScript techniques for data transformation

export function transformEmployeeData(employees) {
  // Performance tracking
  performance.mark('transformStart');
  
  // Using array methods, destructuring, and arrow functions
  const result = employees
    .filter(employee => employee.active)
    .map(({ id, firstName, lastName, email, department }) => ({
      id,
      fullName: `${firstName} ${lastName}`,
      email,
      department,
      displayName: `${firstName} ${lastName[0]}.`
    }))
    .sort((a, b) => a.department.localeCompare(b.department));
  
  // End performance tracking
  performance.mark('transformEnd');
  performance.measure('Transform Duration', 'transformStart', 'transformEnd');
  
  // Use console.table for better data visualization
  console.table(result, ['id', 'fullName', 'department']);
  
  return result;
}

// Sample data for testing
export const employees = [
  {
    id: 101,
    firstName: 'Morgan',
    lastName: 'Chen',
    email: 'morgan.chen@company.io',
    department: 'Engineering',
    active: true,
  },
  {
    id: 102,
    firstName: 'Taylor',
    lastName: 'Wilson',
    email: 'taylor.wilson@company.io',
    department: 'Marketing',
    active: false,
  },
  {
    id: 103,
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex.rivera@company.io',
    department: 'Design',
    active: true,
  },
  {
    id: 104,
    firstName: 'Jamie',
    lastName: 'Patel',
    email: 'jamie.patel@company.io',
    department: 'Engineering',
    active: true,
  },
];

// Example usage
const transformedData = transformEmployeeData(employees);
console.log('Transformed Employees:', transformedData);
