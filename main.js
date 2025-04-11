// Process Client Data
export function processClientData(clients) {
    performance.mark('clientStart');

    const processedClients = clients
        .filter(client => client.status === 'active')
        .map(client => ({
            clientId: client.id,
            companyName: client.companyName,
            email: client.email,
            status: client.status.charAt(0).toUpperCase() + client.status.slice(1)
        }))
        .sort((a, b) => a.companyName.localeCompare(b.companyName));

    performance.mark('clientEnd');
    performance.measure('Client Processing', 'clientStart', 'clientEnd');

    console.table(processedClients, ['clientId', 'companyName', 'email', 'status']);

    return processedClients;
}
