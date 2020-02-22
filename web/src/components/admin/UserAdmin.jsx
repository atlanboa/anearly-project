import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import * as userAPI from "../../apis/userAPI";
import {
  Search,
  Clear, 
  ChevronLeft, 
  ChevronRight,
  FirstPage,
  LastPage,
  Add,
  Edit,
  Delete,
  Check
} from "@material-ui/icons";

const UserAdmin = props => {
  const columns = [
    { title: 'E-mail', field: 'email' },
    { title: '닉네임', field: 'nickname' },
    { title: '연락처', field: 'phone'},
    {title: '나이', field: 'age'},
  ];

  const [user, setUser] = useState([]);
    
  useEffect(()=>{
    setUser(props.data)
  });
 
  return (
    <MaterialTable
      icons={{
        Search: Search,
        Edit: Edit,
        Delete: Delete,
        Add: Add,
        Check: Check,
        Clear: Clear,
        ResetSearch: Clear,
        FirstPage: FirstPage,
        LastPage: LastPage,
        NextPage: ChevronRight,
        PreviousPage: ChevronLeft,          
      }}

      options={{
        actionsColumnIndex: -1
      }}

      title="회원 관리"
      columns={columns}
      data={user}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setUser(prevState=>{
                let temp = [...prevState];
                temp.splice(temp.indexOf(oldData), 1);
                props.setData(temp);
                return{ ...prevState, temp };
              })
            }, 600);
            userAPI.deleteUser(oldData.id);
          }),
      }}
    />
  );
}
export default UserAdmin;