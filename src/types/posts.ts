export interface IPost {
  _id: string;
  message: string;
  author: string;
  author_id: string;
  createdAt: Date;
  updatedAt: Date;
  photo?: string;
  video?: string;
}
