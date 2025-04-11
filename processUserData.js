// Function: Transform Client Data for Client Portal
export function processClientData(clients) {
  // Log transformation process using performance API
  performance.mark('clientProcessStart');

  const processedClients = clients
    .filter((client) => client.status === 'active') // Filter only active clients
    .map((client) => ({
      clientId: client.id,
      companyName: client.companyName,
      contactEmail: client.email,
      status: client.status.charAt(0).toUpperCase() + client.status.slice(1), // Capitalize status
    }))
    .sort((a, b) => a.companyName.localeCompare(b.companyName)); // Sort by company name

  performance.mark('clientProcessEnd');
  performance.measure('Client Process Duration', 'clientProcessStart', 'clientProcessEnd');

  // Display processed clients in a console table
  console.table(processedClients, ['clientId', 'companyName', 'contactEmail', 'status']);

  return processedClients;
}
