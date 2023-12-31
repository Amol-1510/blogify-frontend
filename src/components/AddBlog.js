import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {Box,Typography,TextField,Button,InputLabel} from "@mui/material";
import axios from "axios";

const labelStyle = {mb:0,mt:1,fontSize:'24px',fontWeight:"bold"};

const AddBlog = () => {
  
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title:"",description:"",imageURL:""
  });

  const handleChange = (e) =>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs); 

    sendRequest()
    .then((data)=>console.log(data))
    .then(()=>navigate("/blogs"));
  } 

  const sendRequest = async() =>{
    const res = await axios.post("https://blogify-backend.amolbatra.repl.co/api/blog/add",{  
      title:inputs.title,
      description : inputs.description,
      image : inputs.imageURL,
      user: localStorage.getItem("userId")
    }).catch((err)=>console.log(err));

    const data = await res.data;

    return data;
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3}  
        borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(116,9,121,1) 34%, rgba(0,212,255,1) 100%);" 
        borderRadius={10} 
        boxShadow="10px 10px 20px #ccc"
        padding={3} margin={"auto"} marginTop={3}
        display="flex"
        flexDirection={"column"}
        width="60%"
        >
          <Typography fontWeight={'bold'} padding={1} color={'grey'}
          variant={"h3"}
          textAlign={"center"}
          >POST YOUR BLOG</Typography>
          <InputLabel sx={{mt:2,fontSize:'24px',fontWeight:"bold"}}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant='outlined' />
          
          <InputLabel sx={labelStyle}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin='normal' variant='outlined' />
          
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='normal' variant='outlined' />
          
          <Button type="submit" sx={{mt:2,borderRadius:4}} variant="contained" color="warning" >Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog