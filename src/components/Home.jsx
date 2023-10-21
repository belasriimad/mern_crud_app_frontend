import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from './layouts/Spinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const[loading, setLoading] = useState(false);
  const[tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/tasks');
        setTasks(response.data.tasks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
        const respone = await axios.delete(`http://localhost:3001/tasks/${id}`);
        toast.success(respone.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
        let updatedTasks = [...tasks];
        updatedTasks = tasks.filter(task => task._id !== id);
        setTasks(updatedTasks);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row my-5">
        {
          loading ? <Spinner />
          : 
          tasks?.map(task => (
            <div className="col-md-4" key={task._id}>
              <div className="card">
                <div className="card-header bg-white text-center">
                  <h6 className={`mt-2 ${task.done ? 'done' : ''}`}>
                    { task.title.toUpperCase() }
                  </h6>
                </div>
                <div className="card-body">
                  <p className={`text-muted ${task.done ? 'done' : ''}`}>
                    { task.description }
                  </p>
                </div>
                <div className="card-footer bg-white d-flex justify-content-between">
                  <Link to={`/edit/${task._id}`} className="btn btn-sm btn-warning">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button className="btn btn-sm btn-danger"
                    onClick={() => deleteTask(task._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
