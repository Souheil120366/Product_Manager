import React from 'react';

import '../App.css';
import {Link} from 'react-router-dom';
import DeleteUser from './DeleteUser';

const UserList = props => {
  const {userList, setUserList} = props;
  console.log('User List', userList);
  const removeFromDom = userId => {
    setUserList (userList.filter (user => user._id !== userId));
  };

  return (
    <div>
      <header>
        All Users
      </header>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {userList.map ((user, index) => {
          return (
            <tr key={index}>
              <td>
                <Link to={`/${user._id}`}>
                  {' '}{user.firstName}{' '}{user.lastName}
                </Link>
              </td>
              <td>
                <Link to={'/edit/' + user._id}>
                  Edit
                </Link>
              </td>
              <td>
                <DeleteUser
                  userId={user._id}
                  successCallback={() => removeFromDom (user._id)}
                />
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};
export default UserList;
