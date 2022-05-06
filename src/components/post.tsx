import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IPost } from '../types/posts';
import { User } from '../types/user.types';

interface PostProps extends IPost {
  removePost: (id: string) => void;
  user: User;
}

const Post: React.FC<PostProps> = ({
  message,
  photo,
  createdAt,
  author,
  removePost,
  user,
  author_id,
  _id,
}) => {
  const date = new String(new Date(createdAt).toLocaleDateString());
  return (
    <Card style={{ width: '70%', margin: '15px auto', padding: '5px' }}>
      {photo && <Card.Img className='img-fluid' variant='top' src={photo} />}
      <Card.Body>
        <Card.Text>Сообщение: {message}</Card.Text>
        <Card.Text>Автор: {author}</Card.Text>
        <Card.Text>Дата: {date}</Card.Text>
      </Card.Body>
      {author_id === user.id && (
        <div style={{ display: 'flex', gap: '3px' }}>
          <Button onClick={() => removePost(_id)}>x</Button>
          <Link to={`/update/${_id}`} className='btn btn-primary'>
            &#x022EF;
          </Link>
        </div>
      )}
    </Card>
  );
};

export default Post;
