import React, { useState } from "react";

const Crud = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    employeeID: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editClick) {
        const tempTableData = [...tableData]; 
        tempTableData[editIndex] = { ...tempTableData[editIndex], ...inputs }; 
    
        setTableData(tempTableData); 
        setEditClick(false);
        setInputs({
          name: "",
          email: "",
          employeeID:"",
        });
      } else {
        setTableData([...tableData, inputs]);
        setInputs({
          name: "",
          email: "",
          employeeID:"",
        });
      }
    };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ name: tempData.name, email: tempData.email, employeeID:tempData.employeeID });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div className="min-h-screen bg-blue-400">
      <h1 className="text-center font-bold m-5 text-2xl">Crud Operations</h1>
      <div className="bg-[#e5e4e4] max-w-fit m-auto p-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Name</label>
            <input name="name" value={inputs.name} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input name="email" value={inputs.email} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label>Employee ID</label>
            <input
              name="employeeID"
              value={inputs.employeeID}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full bg-[#014d64] text-white mt-3">
            {editClick ? "update" : "Add"}
          </button>
        </form>
      </div>
      <div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Employ ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData.map((item, i) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.employeeID}</td>
                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
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
  );
};

export default Crud;