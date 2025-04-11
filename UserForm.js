import React from 'react';
import useForm from '../hooks/useForm';

function UserForm() {
  const initialState = { name: '', email: '', role: 'Developer' };
  const { values, handleChange, reset } = useForm(initialState);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('New Member:', values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <select name="role" value={values.role} onChange={handleChange}>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
        <option value="Manager">Manager</option>
      </select>
      <button type="submit">Add Member</button>
    </form>
  );
}

export default UserForm;
