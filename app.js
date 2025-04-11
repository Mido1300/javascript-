import React, { useContext } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ProjectList from './components/ProjectList';
import ProfileCard from './components/ProfileCard';
import TodoApp from './components/TodoApp';
import { ThemeContext } from './contexts/ThemeContext';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Project Dashboard</h1>
        <p>Welcome, {user.name}</p>
      </header>
      <main>
        <section className="card">
          <h2>Team Members</h2>
          <UserList />
        </section>
        <section className="card">
          <h2>Add Member</h2>
          <UserForm />
        </section>
        <section className="card">
          <h2>Recent Projects</h2>
          <ProjectList />
        </section>
        <section className="card">
          <h2>Your Profile</h2>
          <ProfileCard />
        </section>
        <section className="card">
          <h2>Task Manager</h2>
          <TodoApp />
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Project Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
