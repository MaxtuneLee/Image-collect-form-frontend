import { Alert, AlertTitle, AppBar, Container, Toolbar, Typography } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Error() {
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
        <Alert variant='filled' severity="error">
          <AlertTitle><strong>提交失败</strong></AlertTitle>
          你的信息没有成功提交到服务器，请重试。或者将错误信息反馈给管理员。
        </Alert>
      </Container>
    </Fragment>
  );
}

export default Error;
