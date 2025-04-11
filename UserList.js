import React, { useState } from 'react';
import UserCard from './UserCard';
import { users } from '../data/sampleData';

function UserList() {
  const [filter, setFilter] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search members..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="search-input"
      />
      <div className="user-grid">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
