import React from 'react';
import axios from 'axios';
const url = '';

const DeleteUser = props => {
  const {userId, successCallback} = props;
  const deleteUser = e => {
    axios.delete (url + '/api/users/' + userId).then (res => {
      successCallback ();
    });
  };
  return (
    <button onClick={deleteUser}>
      Delete
    </button>
  );
};
export default DeleteUser;
