import { Comments } from '../../../types/Comment'
import CommentCard from '../../atoms/cards/comment/CommentCard'

type Props = {
  comments: Comments[]
}

const ListComment = ({ comments }: Props) => {
  return (
    <div className='flex flex-col gap-8'>
      {comments?.map((cmt) => <CommentCard key={cmt.id} comment={cmt} />)}
    </div>
  )
}
export default ListComment
