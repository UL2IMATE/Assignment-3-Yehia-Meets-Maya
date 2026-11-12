import React from "react";

const Employee = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!response.ok)
    return (
      <p className="m-auto text-5xl text-red-700">
        Could Not Fetch Employee Info
      </p>
    );

  const user = await response.json();

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center ">
        <h2 className="text-5xl mb-5">Employee Profile </h2>

        <div className=" flex flex-col gap-4 text-xl text-gray-600 text-center">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Company: {user.company.name}</p>
        </div>
      </div>
    </>
  );
};

export default Employee;
