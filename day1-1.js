// Async Data Fetching Exercise
// This module demonstrates modern async patterns including Promises and async/await

// Utility for handling API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return await response.json();
};

// Main fetch function using async/await
export async function fetchProjectData(projectId) {
  try {
    // Log operation start
    console.time('fetchProjectData');
    console.log(`Fetching data for project ID: ${projectId}`);
    
    // Use Promise.all to fetch multiple resources in parallel
    const [projectDetails, projectTasks, projectMembers] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${projectId}`)
        .then(handleResponse),
      fetch(`https://jsonplaceholder.typicode.com/posts/${projectId}/comments`)
        .then(handleResponse),
      fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(handleResponse)
        .then(users => users.slice(0, 3)) // Simulate filtering relevant team members
    ]);
    
    // Process data using destructuring and rest operator
    const { title, body, ...metadata } = projectDetails;
    
    // Compose final result object
    const result = {
      project: {
        title,
        description: body,
        metadata
      },
      tasks: projectTasks.map(({ name, body }) => ({ 
        name: name || 'Unnamed Task', 
        description: body
      })),
      team: projectMembers.map(({ id, name, email }) => ({ id, name, email }))
    };
    
    console.timeEnd('fetchProjectData');
    return result;
    
  } catch (error) {
    console.error('Error fetching project data:', error);
    // Re-throw with additional context
    throw new Error(`Project data fetch failed: ${error.message}`);
  }
}

// Demonstrate error handling with try/catch
export async function fetchWithErrorHandling() {
  try {
    const data = await fetchProjectData(1);
    console.log('Successfully retrieved project data:', data);
    return data;
  } catch (error) {
    console.error('Error in fetch operation:', error);
    // Provide fallback data
    return { 
      error: true, 
      message: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Example usage
fetchWithErrorHandling();
