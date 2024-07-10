type Props = {
  user: string;
  userImage: string | undefined;
  date: string;
  rating?: string | number;
};

const CommentFooter = ({ user, userImage, date, rating }: Props) => {
  return (
    <div className="flex gap-4 justify-center">
      {userImage ? (
        <img
          src={userImage}
          alt={user}
          className="w-[60px] h-[60px] object-cover rounded-full"
        />
      ) : (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          alt={user}
          className="w-[60px] h-[60px] object-cover rounded-full"
        />
      )}

      <div className="flex justify-between w-full">
        <div>
          <div className="font-medium text-xl mb-1">{user}</div>
          <div className="font-medium text-xs text-gray-9E9E9E">{date}</div>
        </div>
        <div>
          {rating && (
            <div className="bg-primary-500 rounded-lg text-white p-1 flex flex-row justify-center w-fit ">
              <img
                src="/assets/icons/like/white_star.svg"
                className="p-[2.5] "
              />
              <div className="font-medium text-xs content-center">{rating}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentFooter;
