import { useState } from "react";
import { Commment } from "../../../../types/Comment";

type Props = {
  comment: Commment;
};

const Comment: React.FC<Props> = ({ comment }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="rounded-lg bg-gray-F9F9F9 p-16 border-gray-EDEDED"></div>
  );
};
