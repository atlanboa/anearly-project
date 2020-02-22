import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const AdminPageButton = (props) => {
  return (
    <Link to={{pathname: "/AdminPage", state:{auth:true}}}><Button>관리자 페이지로 가기☞</Button></Link>
  )
}
export default AdminPageButton;

