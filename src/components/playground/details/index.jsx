import React from "react";

const Details = ({ user1, user2 }) => {
  // console.log("rendered");
  return (
    <>
      <div>
        <img src={user1.p} alt="" height="150px" width="150px" />
        <p>name: {user1.n}</p>
        <p>status: {user1.o}</p>
        <p>uid: {user1.u}</p>
      </div>
      {user2 && (
        <div>
          <img src={user2.p} alt="" height="150px" width="150px" />
          <p>name: {user2.n}</p>
          <p>status: {user2.o}</p>
          <p>uid: {user2.u}</p>
        </div>
      )}
      turn: you
    </>
  );
};

export default Details;
