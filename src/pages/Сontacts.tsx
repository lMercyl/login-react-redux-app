import React from 'react';
import { Row, Col, InputGroup, Form, ButtonGroup, Button, Container, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/selectorHook';
import { useAuth } from '../hooks/useAuth';
import { fetchContacts } from '../redux/contacts/asyncAction';
import { selectContacts } from '../redux/contacts/selector';
import { editItem, removeItem } from '../redux/contacts/slice';
import { Item } from '../redux/contacts/types';

interface Contact {
  name: string;
  phone: string;
  id: string;
}

const Contacts = () => {
  const dispatch = useAppDispatch();

  const { list } = useSelector(selectContacts);

  const { isAuth, email } = useAuth();

  const [search, setSearch] = React.useState<string>('');
  const [show, setShow] = React.useState<boolean>(false);
  const [contact, setContact] = React.useState<Contact>({
    name: '',
    phone: '',
    id: '',
  });

  const handleClose = () => {
    setShow(false);
    setContact({
      name: '',
      phone: '',
      id: '',
    });
  };

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterList = (value: string) => {
    return value === ''
      ? list
      : list.filter(
          (item: Item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) || item.phone.includes(value),
        );
  };

  const handleShow = (id: string) => {
    setContact({ ...contact, id: id });
    setShow(true);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handleChange = () => {
    dispatch(editItem(contact));
    setShow(false);
  };

  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchContacts());
    }
  }, []);

  return isAuth ? (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
            <Form.Control
              onChange={onChangeInput}
              name="name"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Phone</InputGroup.Text>
            <Form.Control
              onChange={onChangeInput}
              name="phone"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="p-3">
        <span>Welcome {email}</span>
      </Row>
      <Row className="justify-content-center p-3">
        <Col lg={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
            <Form.Control
              onChange={onChangeSearch}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </Col>
      </Row>
      <ul>
        <Row className="gy-3 flex-column align-items-center p-3">
          {filterList(search).map((item: Item) => (
            <Col key={item.id} lg={6}>
              <li className="d-flex justify-content-between align-items-center">
                <span>{item.phone}</span>
                <span>{item.name}</span>
                <ButtonGroup>
                  <Button onClick={() => handleShow(item.id)}>Edit</Button>
                  <Button onClick={() => dispatch(removeItem(item.id))} variant="danger">
                    Delete
                  </Button>
                </ButtonGroup>
              </li>
            </Col>
          ))}
        </Row>
      </ul>
    </Container>
  ) : (
    <Container>
      <Row className="p-3">
        <span>Not found</span>
      </Row>
    </Container>
  );
};

export default Contacts;
