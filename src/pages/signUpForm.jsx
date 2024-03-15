
  import { Link } from 'react-router-dom';
import '../styles/login.css'
  import React, { useState,useNavigate } from 'react';

  const SignupForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      name: '',
      age: '',
      password: '',
      allergy: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Signup successful', data);
          localStorage.setItem('token', data.authToken);
          window.location.href = '/';
          
        } else {
          const errorData = await response.json();
          console.error('Signup error', errorData);
        }
      } catch (error) {
        console.error('Signup error', error);
      }
    };

    return (
      <div className='flex flex-row justify-center items-center p-10'>

      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md border-4 border-solid border-blue-700 w-2/5 ">
        <h1 className='text-xl font-bold'>Signup</h1>
        <p>if you already have account <Link to='/login' className='text-blue-600 hover:text-yellow-400'>login</Link> here</p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Allergy:</label>
          <input type="text" name="allergy" value={formData.allergy} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signup</button>
      </form>
      </div>
    );
  };

  export default SignupForm;

  