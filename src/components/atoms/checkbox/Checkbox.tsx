import { Checkbox as AntCheckbox } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

type Props = {
  options: string[] | number[];
  basePath: string;
  queryKey: string;
  defaultValue?: string[];
};

const Checkbox = ({ options, basePath, queryKey, defaultValue }: Props) => {
  const navigate = useNavigate();
  const location = useLocation(); // Added to use the current location
  const currentParams = queryString.parse(location.search);

  const onChange = (checkedValues: Array<string | number>) => {
    console.log("checked = ", checkedValues);

    // Create new parameters object
    const newParams = { ...currentParams };

    if (checkedValues.length > 0) {
      // If there are checked values, update the query parameter
      newParams[queryKey] = checkedValues.join(",");
    } else {
      // If no values are checked, remove the query parameter
      delete newParams[queryKey];
    }

    // Navigate to the new URL with updated query parameters
    navigate({
      pathname: basePath,
      search: `?${queryString.stringify(newParams)}`,
    });
  };

  return (
    <AntCheckbox.Group
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
      className="flex flex-col gap-4"
    />
  );
};

export default Checkbox;
