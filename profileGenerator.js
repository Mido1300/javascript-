// User Component Generator Module
export function generateLeadProfileHTML(lead) {
  console.dir({
    componentType: 'LeadProfile',
    leadId: lead.id,
    name: `${lead.firstName} ${lead.lastName}`
  });
  
  const statusBadge = lead.isActive
    ? '<span class="badge active">Online</span>'
    : '';
  return `
    <div class="lead-card" id="lead-${lead.id}">
      <img src="${lead.avatar}" alt="${lead.firstName} ${lead.lastName}" class="avatar" />
      <div class="lead-info">
        <h2>${lead.firstName} ${lead.lastName}</h2>
        <p>Email: ${lead.email}</p>
        <p>Position: ${lead.position}</p>
        ${statusBadge}
      </div>
    </div>
  `;
}
