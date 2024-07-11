import { Switch as AntSwitch } from "antd";
import { cn } from "../../../utils/utils";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

type Props = {
  title: string;
  basePath: string;
  className?: string;
};

const Switch = ({ title, basePath, className }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentParams = queryString.parse(location.search);
  console.log("Current Params:", currentParams);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    navigate({
      pathname: basePath,
      search: queryString.stringify({
        ...currentParams,
        discount: checked,
      }),
    });
  };
  return (
    <div
      className={cn("flex justify-between items-center px-4 py-3", className)}
    >
      <h5>{title}</h5>
      <AntSwitch onChange={onChange} />
    </div>
  );
};

export default Switch;
