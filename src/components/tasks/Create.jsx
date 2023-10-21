import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const task = {
      title: title,
      description: description
    };

    try {
      const response = await axios.post('http://localhost:3001/tasks', task);
      setLoading(false);
      toast.success('Your task has been added!', {
          position: toast.POSITION.TOP_RIGHT
      });
      navigate('/');
    } catch (error) {
      setLoading(false);
      if (error.response.status === 422) {
        setError(error.response.data.message);
      }
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-6 mx-auto">
          {
            error && <div className="text-white my-2 rounded p-2 bg-danger">
              {error}
            </div>
          }
          <div className="card">
            <div className="card-header text-center bg-white">
              <h6 className="mt-2">
                Create task
              </h6>
            </div>
            <div className="card-body">
              <form className="mt-5" onSubmit={(e) => formSubmit(e)}>
                  <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title*</label>
                      <input 
                        type="text" 
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control" 
                        placeholder="Title*" />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description*</label>
                      <textarea 
                        className="form-control" 
                        name="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Body*"
                        rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    {
                      loading ? 
                        <Spinner />
                        :
                        <button
                            type="submit" 
                            className="btn btn-primary">
                            Create
                        </button>
                    }
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
