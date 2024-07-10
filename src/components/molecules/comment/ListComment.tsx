import { Comment } from "../../../types/Comment";
import CommentCard from "../../atoms/cards/comment/CommentCard";

type Props = {
  comments: Comment[] | undefined;
};

const ListComment = ({ comments }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="font-medium text-xl">Comments</div>
      {comments?.map((cmt) => (
        <CommentCard comment={cmt} />
      ))}
    </div>
  );
};
export default ListComment;
