interface PhotoCommentsProps {
  id: number;
  comments: string[];
}

const PhotoComments = ({ id, comments }: PhotoCommentsProps) => {
  return <div>PhotoComments</div>;
};

export default PhotoComments;
