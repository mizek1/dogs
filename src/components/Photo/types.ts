export interface Photo {
  acessos: string;
  author: string;
  date: string | Date;
  id: number;
  idade: string;
  peso: string;
  src: string;
  title: string;
  total_comments: string;
}

export interface Comment {
  comment_ID: number;
  comment_author: string;
  comment_content: string;
}

export interface PhotoWithComments {
  photo: Photo;
  comments: Comment[];
}
