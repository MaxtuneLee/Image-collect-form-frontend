import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import axios from "axios";
import {
  ConstructionOutlined,
  Javascript,
  PhotoCamera,
} from "@mui/icons-material";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Route, Routes, useNavigate } from "react-router-dom";
import Result from "./result";
import Error from "./error";

const inputState = atom({
  key: "inputState",
  default: {
    nameError: false,
    idError: false,
    fileError: false,
  },
});

const inputHelperText = atom({
  key: "inputHelperText",
  default: {
    nameHelperText: "",
    idHelperText: "",
    fileHelperText: "",
  }
})


function App() {
  const navigate = useNavigate()
  const [file, setFile] = useState("尚未选择文件");
  const [disable, setDisable] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const setInputError = useSetRecoilState(inputState);
  const setInputHelperText = useSetRecoilState(inputHelperText);
  const inputError = useRecoilValue(inputState);
  const useInputHelperText = useRecoilValue(inputHelperText);


  function ErrorMsg(props: any) {
    if (error === true) {
      return (
          <Alert severity="error">错误信息：{errorMessage.toString()}</Alert>
      )
    }
    else {
      return (<></>)
    }
  }

  //this function is for the file input
  function fileName<ChangeEvent>() {
    let getFile: any = document.getElementById("icon-button-file")!;
    // console.log(getFile.files[0].name);
    setFile(getFile.files[0].name);
  }

  //this function is for the input validation
  function SubmitEvent() {
    let name: any = document.getElementById("name")!;
    let id: any = document.getElementById("id")!;
    let uploadFile: any = document.getElementById("icon-button-file")!;
    if (name.value === "") {
      setInputError((prevState) => ({ ...prevState, nameError: true }));
      setInputHelperText((prevState) => ({ ...prevState, nameHelperText: "姓名不能为空" }));
      console.log(inputError.nameError);
    }
    if (id.value === "") {
      setInputError((prevState) => ({ ...prevState, idError: true }));
      setInputHelperText((prevState) => ({ ...prevState, idHelperText: "学号不能为空" }));
      console.log(inputError.idError);
    }
    if (uploadFile.files[0] === undefined) {
      setInputHelperText((prevState) => ({ ...prevState, fileHelperText: "请选择文件" }));
    }
    if (name.value === "" || id.value === "" || uploadFile.files.length === 0) {
      console.log("please input all blank");
    } else {
      let formData = new FormData();
      formData.append("file", uploadFile.files[0]);
      formData.append("name", name.value);
      formData.append("id", id.value);
      axios({
        method: "post",
        url: "/user/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.success) {
            navigate("/result");
            setError(false);
            setDisable(true);
          } else {
            navigate("/error");
            setError(true);
            setErrorMessage(res.data.errMsg)
            console.log(res.data);
          }
        })
        .catch((err) => {
          navigate("/error");
          setErrorMessage(err.toString());
          console.log(err);
        });
    }
    return false;
  }


  return (
    <Fragment>
      <Routes>
        <Route path="/result" element={<Result />} />
        <Route path="/error" element={<Error />} />
      </Routes>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div">
            核酸情况收集
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <ErrorMsg />
      <Container maxWidth="sm" className="mainBody">
        <Typography variant="h4" component="div" style={{ fontWeight: "bold" }}>
          核酸情况收集
        </Typography>
        <Typography variant="h6" component="div" className="subtitle">
          请填写学号姓名并上传你的核酸截图
        </Typography>
        <Box
          mt={10}
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            required
            id="name"
            label="姓名"
            margin="normal"
            error={inputError.nameError}
            helperText={useInputHelperText.nameHelperText}
            disabled={disable}
          />
          <TextField
            required
            id="id"
            label="学号"
            margin="normal"
            error={inputError.idError}
            helperText={useInputHelperText.idHelperText}
            disabled={disable}
          />
          <FormControl margin="dense" required>
            <FormLabel>文件上传</FormLabel>
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
              <span style={{ marginLeft: 5 }}>{file}</span>
              <input
                required
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file"
                multiple
                type="file"
                onChange={fileName}
              />
            </label>
            <FormHelperText style={{ color: '#d32f2f' }}>{useInputHelperText.fileHelperText}</FormHelperText>
          </FormControl>
          <FormControl
            margin="normal"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
              marginTop: "40px",
            }}
          >
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                fullWidth
                size="large"
                onClick={SubmitEvent}
                disabled={disable}
              >
                提交
              </Button>
            </label>
          </FormControl>
        </Box>
      </Container>
    </Fragment>
  );
}

export default App;
