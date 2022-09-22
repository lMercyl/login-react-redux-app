import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../hooks/selectorHook';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../redux/user/slice';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          }),
        );
        navigate('/contacts');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row className="align-items-center flex-column p-5">
          <Col lg={4} className="mb-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control {...register('email')} type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control {...register('password')} type="password" placeholder="Password" />
            </Form.Group>
          </Col>
          <Col className="d-grid" lg={4}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default Login;
