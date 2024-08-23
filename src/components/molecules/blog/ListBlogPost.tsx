import { Blog } from "../../../types/Blog";
import BlogCard from "../../atoms/cards/blog/BlogCard";

type Props = {
  blogList: Blog[];
  loading: boolean;
};

const ListBlogPost = ({ blogList, loading }: Props) => {
  return (
    <>
      <div className="sm:flex flex-col lg:grid grid-cols-12 gap-4">
        {blogList.slice(0, 4).map((blog) => (
          <BlogCard
            loading={loading}
            className="col-span-6 min-w-full"
            key={blog.id}
            id={blog.id}
            title={blog.title}
            releaseDate={blog.releaseDate}
            readTime={blog.readTime}
            content={blog.content}
            author={blog.author}
            image={blog.image}
          />
        ))}
      </div>
    </>
  );
};
export default ListBlogPost;
