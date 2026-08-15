import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser, deleteuser, updateuser } from "../crud/crudSlice";
import "../assets/css/signup.css";

const SignUp = () => {
  const dispatch = useDispatch(); //form ke through jo data lia hai usko dispatch kia actions mai(yani adduser function mai) jo ki reducer ke andar bani hai actions.
  let crudData = useSelector((state) => state.crud.arr); //here arr is normal variable name jo ki [] type ka banaya hai slice mai

  const [inputvalue, setInputvalue] = useState({
    //here inputvalue is state variable not a normal variable
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  //search
  const filteredData = crudData
    .map((items, index) => ({
      ...items,
      originalIndex: index,
    }))
    .filter((items) => {
      return (
        items.name.toLowerCase().includes(search.toLowerCase()) ||
        items.email.toLowerCase().includes(search.toLowerCase())
      );
    });

  const inputhandler = (event) => {
    setInputvalue({ ...inputvalue, [event.target.name]: event.target.value });
  };

  const formhandler = (event) => {
    event.preventDefault();
    if (editIndex === null) {
      dispatch(adduser(inputvalue));
    } else {
      dispatch(
        updateuser({
          index: editIndex,
          updatedUser: inputvalue,
        }),
      );
      setEditIndex(null);
    }
    setInputvalue({
      name: "",
      email: "",
      age: "",
      password: "",
    });
  };

  //delete
  const deleteHandler = (index) => {
    const confirmDelete = confirm("Are you sure want to delete this user?");
    if (confirmDelete) {
      dispatch(deleteuser(index));
    }
  };

  const editHandler = (index) => {
    const confirmEdit = confirm("Are you sure want to edit this user?");
    if (confirmEdit) {
      setInputvalue(crudData[index]);
      setEditIndex(index);
    }
  };
  return (
    <div className="container mt-3">
      <div className="row mt-3 mb-3 mx-auto">
        <div className="col-md-7 mx-auto mt-3 mb-3">
          <div className="card p-3 mt-3 mb-3">
            <h3 className="alert alert-success text-center">Crud App</h3>
            <form onSubmit={formhandler}>
              <div className="mt-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="form-control"
                  onChange={inputhandler}
                  value={inputvalue.name}
                />
              </div>
              <div className="mt-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="form-control"
                  onChange={inputhandler}
                  value={inputvalue.email}
                />
              </div>
              <div className="mt-3">
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  className="form-control"
                  onChange={inputhandler}
                  value={inputvalue.age}
                />
              </div>
              <div className="mt-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="form-control"
                  onChange={inputhandler}
                  value={inputvalue.password}
                />
              </div>
              <div className="mt-2">
                <button type="submit" className="btn btn-primary mt-1">
                  {editIndex === null ? "Submit" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7 mx-auto">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search by name & email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ced4da",
                borderRadius: "6px",
                outline: "none",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div className="table-responsive">
            <table className="table text-center">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((items, index) => {
                  //crudData yani directly arr me mapping kr rhe hai kyonki upar state.crud.arr se data crudData variable me lia
                  return (
                    <tr key={items.originalIndex}>
                      <td>{index + 1}</td>
                      <td>{items.name}</td>
                      <td>{items.email}</td>
                      <td>{items.age}</td>
                      <td>••••••••</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => editHandler(items.originalIndex)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteHandler(items.originalIndex)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
