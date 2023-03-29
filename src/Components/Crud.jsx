import React, { useState } from "react";
import "./Crud.css";

const Crud = () => {
  const [userData, setUserData] = useState([]); // for storing data in table
  const [updateStatus, setUpdateStatus] = useState(false); // for changing the status of form btn
  const [editIndex, setEditIndex] = useState(""); // for updating the update btn

  // making the initilazation for input fields
  const [DataValue, setDataValue] = useState({
    name: "",
    username: "",
    email: "",
  });

  // function that gets the data from the input fields and pass the data to hook
  const handleChange = (event) => {
    setDataValue({
      ...DataValue,
      [event.target.name]: event.target.value,
    });
  };

  // function that set the data
  const handleSubmit = (event) => {
    event.preventDefault();
    if (updateStatus) {
      const PreviousData = userData;
      Object.assign(PreviousData[editIndex], DataValue); // its sets the update index row to previous data list
      setUserData([...PreviousData]);
      setUpdateStatus(false);
      setDataValue({
        name: "",
        username: "",
        email: "",
      });
    } else {
      setUserData([...userData, DataValue]);

      setDataValue({
        id: null,
        name: "",
        username: "",
        email: "",
      });
    }
  };

  // function that delete the dataRow
  const DeleteBtn = (Delete_id) => {
    setUserData(userData.filter((item, id) => id !== Delete_id));
  };

  // function that updated the dataRow
  const UpdateBtn = (update_id) => {
    const Update_select_data = userData[update_id];
    // setting the selected fileds data into forms filed
    setDataValue({
      name: Update_select_data.name,
      username: Update_select_data.username,
      email: Update_select_data.email,
    });
    setUpdateStatus(true);
    setEditIndex(update_id);
  };
  return (
    <>
      <div className="contianer main">
        <h1
          data-comp-title="Heading"
          className="draggable main_heading"
          data-htmlcomponent-type="html/heading"
        >
          Dummy Crud
        </h1>
        <div className="row pt-0 p-5">
          <div className="col-5">
            <h1 className="text-center display-3 ">Add User</h1>
            {/* Submit Fomr */}
            <div className="fomr_parent ">
              <form onSubmit={handleSubmit} className="mt-5 mx-5">
                <div className="form-group mb-4">
                  <label>Name:</label>
                  <input
                    required
                    type="text"
                    name="name"
                    autocomplete="off"
                    value={DataValue.name}
                    pattern="[A-Za-z\s]+"
                    onChange={handleChange}
                    className="form-control "
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Username:</label>
                  <input
                    required
                    type="text"
                    name="username"
                    autocomplete="off"
                    value={DataValue.username}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-4">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    autocomplete="off"
                    value={DataValue.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="Add_btn">
                  {updateStatus ? "update" : "Add"}
                </button>
              </form>
            </div>
          </div>

          {/* SHow Users */}

          <div className="col-7">
            <h1 className="text-center display-3">List Users</h1>

            <table className="table table-bordered  ">
              <thead>
                <tr className="table-light">
                  <th>Id</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {userData.map((item, id) => (
                  <tr>
                    <td>{id + 1}</td>

                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>

                    <td className="d-flex">
                      <button
                        onClick={() => UpdateBtn(id)}
                        className="edit_btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => DeleteBtn(id)}
                        className="delete_btn ms-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crud;
