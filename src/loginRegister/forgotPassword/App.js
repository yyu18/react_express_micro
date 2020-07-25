import React, {useState} from 'react';
import { Button,Form,Container,Row,Col } from 'react-bootstrap';
var resetPassword = 'http://192.168.2.24:4000/resetPassword';
const App = ()=>{
        const [ResetEmail,setResetEmail] = useState({
                email:'',
            });
        const [errors,setErrors] = useState({});

        const handleSubmit = (event) => {
                event.preventDefault();
                event.stopPropagation();
                var errors = validator(ResetEmail);
                setErrors(errors);
                if(Object.keys(errors).length === 0 ){
                        fetch(resetPassword, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(ResetEmail),
                              })
                              .then(response => response.json())
                              .then(data => {
                                console.log(data);
                              }).catch((error) => {
                                  console.error('Error:', error);
                              });
                }
        }

        const validator = (userInfo) => {
                let errors = {};
                if(userInfo.email!==undefined){
                  if(userInfo.email.length===0){
                        errors.email = 'Email Address Is Required'
                  }
                }
                return errors;
        }
        return(
                <Container>
                        <Row  xs={2} md={4} lg={6}>
                        <Col></Col>
                        <Col lg={4}>
                                <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name = "email" placeholder="Enter email" onChange={(event)=>{
                                                
                                                setResetEmail({
                                                ...ResetEmail,
                                                [event.currentTarget.name]:event.currentTarget.value
                                                })
                                                
                                        }} />
                                          {
                                                errors.email&&
                                                <Form.Text style={{color:'red'}}>
                                                        {errors.email}
                                                </Form.Text>
                                         } 
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                        Submit
                                </Button>  
                                </Form>
                        </Col>
                        <Col></Col>
                                
                        </Row>
                </Container>
        )
}

export default App;