import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAppContext } from '../context/app-context';

const UpdatePage = () => {
  const { id } = useParams();
  const [text, setText] = useState<string>('');
  let navigate = useNavigate();
  const [pathToImage, setPathToImage] = useState<string>('');
  const { updatePost, findPost } = useAppContext();

  useEffect(() => {
    id && _findPost(id);
  }, [id]);

  const _findPost = async (id: string) => {
    const post = await findPost(id);
    if (post) setText(post.message);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    updatePost(
      {
        message: text,
        ...(pathToImage ? { photo: pathToImage } : {}),
      },
      id
    );
    navigate('/');
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
    <div className='w-50 mx-auto'>
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
          <Form.Control
            type='file'
            accept='image/*'
            onChange={handleFileUpload}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UpdatePage;
