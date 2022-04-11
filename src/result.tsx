import { Alert, AlertTitle, AppBar, Container, Toolbar, Typography } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Result() {
  const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/')
    },5000)
  })
  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div">
            核酸情况收集
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="sm" className="mainBody">
        <Alert variant='filled' severity="success">
          <AlertTitle><strong>提交成功</strong></AlertTitle>
          你的信息已经成功上传到服务器，如果有其他问题请联系管理员。
        </Alert>
      </Container>
    </Fragment>
  );
}

export default Result;
