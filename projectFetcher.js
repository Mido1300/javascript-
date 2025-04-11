// Async Data Fetching Module
export async function getTeamProjects(teamId) {
  try {
    const timestamp = new Date().toISOString();
    console.info(`[${timestamp}] Fetching projects for team ID: ${teamId}`);
    
    const apiUrl = `https://jsonplaceholder.typicode.com/posts?userId=${teamId}`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    const titles = projects.map((project) => project.title);
    
    console.log(`Successfully fetched ${titles.length} projects`);
    
    return titles;
  } catch (error) {
    console.warn('Error fetching projects:', error);
    throw error;
  }
}
