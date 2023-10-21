import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Spinner from "../layouts/Spinner";

export default function Edit() {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [done, setDone] = useState(0); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    const fetchTask = async () => {
      try {
          const response = await axios.get(`http://localhost:3001/tasks/${id}`);
          setTitle(response.data.task.title);
          setDescription(response.data.task.description);
          setDone(response.data.task.done);
      } catch (error) {
          console.log(error);
      }
    }
    fetchTask()
  }, [id]);

  const formSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const task = {
          title: title,
          description: description,
          done: done
      };

      try {
          await axios.put(`http://localhost:3001/tasks/${id}`, task);
          setLoading(false);

          toast.success('Your task has been updated!', {
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
    <div className="row my-5">
      <div className="col-md-6 mx-auto">
        {
          error && <div className="text-white my-2 rounded p-2 bg-danger">
            {error}
          </div>
        }
        <div className="card">
          <div className="card-header bg-white">
              <h5 className="text-center mt-2">
                  Edit task
              </h5>
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
                <label htmlFor="body" className="form-label">Description*</label>
                <textarea 
                  className="form-control" 
                  name="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description*"
                  rows="3"></textarea>
              </div>
              <div className="form-check mb-3">
                  <input className="form-check-input" 
                      onChange={(e) => setDone(!done)}
                      type="checkbox" 
                      name="done" 
                      id="done"
                      value={done}
                      checked={done}/>
                  <label className="form-check-label" htmlFor="done">
                      Done
                  </label>
              </div>
              <div className="mb-3">
                {
                  loading ? 
                    <Spinner />
                    :
                    <button
                        type="submit" 
                        className="btn btn-primary">
                        Update
                    </button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}