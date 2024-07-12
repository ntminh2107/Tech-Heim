import { Switch as AntSwitch } from "antd";
import { cn } from "../../../utils/utils";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

type Props = {
  title: string;
  basePath: string;
  className?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const Switch = ({
  title,
  basePath,
  className,
  checked,
  onCheckedChange,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentParams = queryString.parse(location.search);

  const onChange = (checked: boolean) => {
    onCheckedChange(checked);
    const newParams = { ...currentParams };

    if (checked) {
      newParams.discount = "true";
    } else {
      delete newParams.discount;
    }

    navigate({
      pathname: basePath,
      search: queryString.stringify(newParams),
    });
  };

  return (
    <div
      className={cn("flex justify-between items-center px-4 py-3", className)}
    >
      <h5>{title}</h5>
      <AntSwitch checked={checked} onChange={onChange} />
    </div>
  );
};

export default Switch;
