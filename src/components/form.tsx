import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { alignPropType } from 'react-bootstrap/esm/types';
import api from '../api/api';
import { useAppContext } from '../context/app-context';

const PostForm = () => {
  const [text, setText] = useState<string>('');
  const [pathToImage, setPathToImage] = useState<string>('');

  const { error, addPost, isAuth } = useAppContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPost({ message: text, photo: pathToImage });
  };

  const handleFileUpload = async (e: any) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      let bodyFormData = new FormData();
      bodyFormData.append('file', file);

      const { data } = await api.post<{ media: string }>(
        '/media',
        bodyFormData
      );
      setPathToImage(data.media);
      console.log(data);
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
        <Form.Label>Сообщение</Form.Label>
        <Form.Control
          onChange={e => setText(e.target.value)}
          value={text}
          as='textarea'
          rows={3}
        />
      </Form.Group>
      <Form.Group controlId='formFile' className='mb-3'>
        <Form.Label>Добавть фото</Form.Label>
        <Form.Control type='file' onChange={handleFileUpload} />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
