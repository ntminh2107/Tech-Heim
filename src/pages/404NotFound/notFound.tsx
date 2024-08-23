import HomeFilled from "@ant-design/icons/lib/icons/HomeFilled";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const redirectHomePage = () => {
    navigate(`/`);
  };

  return (
    <div className="flex flex-col items-center gap-5 my-10">
      <div>
        <img
          src="/assets/images/404/404NotFound.png"
          className="object-contain w-full h-full"
        />
      </div>

      <div className="font-inter font-semibold text-3xl text-primary text-center">
        Ooops! This page could not be found!
      </div>
      <div className="text-xl font-light text-gray-2D2D2D">
        Sorry! This page you are looking for is not available.
      </div>
      <div>
        <Button
          type="primary"
          className="text-xl font-light p-6"
          icon={<HomeFilled />}
          onClick={redirectHomePage}
        >
          Return to home page
        </Button>
      </div>
    </div>
  );
};
export default NotFoundPage;
