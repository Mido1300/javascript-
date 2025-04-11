// Data Transformation Module
export function formatTeamData(members) {
  performance.mark('formatStart');
  
  const result = members
    .filter((member) => member.isActive)
    .map((member) => ({
      id: member.id,
      fullName: `${member.firstName} ${member.lastName}`,
      email: member.email,
    }))
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
  
  performance.mark('formatEnd');
  performance.measure('Format Duration', 'formatStart', 'formatEnd');
  
  console.table(result, ['id', 'fullName', 'email']);
  
  return result;
}
