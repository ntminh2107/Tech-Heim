import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CollapseCheckbox from "../../molecules/collapse/Collapse";
import Checkbox from "../../atoms/checkbox";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import Switch from "../../atoms/switch/Switch";
import { SplitQueryParams } from "../../../utils/convertParams";
import { useEffect, useState } from "react";
import { getFilterProductThunk } from "../../../redux/slice/productSlice";
import { mappingSpec } from "../../../utils/mappingSpec";

const FilterOptions = () => {
  const { categoryId } = useParams<{ categoryId?: string }>() ?? {};
  const { brandList } = useSelector((state: RootState) => state.product);

  const { colorList } = useSelector((state: RootState) => state.product);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const query = SplitQueryParams(location.search);

  const [checked, setChecked] = useState<string[]>([]);
  const [switched, setSwitched] = useState<boolean>(false);
  console.log(categoryId);

  useEffect(() => {
    if (categoryId) {
      dispatch(getFilterProductThunk({ categoryId, query }));
    }
  }, [dispatch, query, categoryId]);

  const { productCatList } = useSelector((state: RootState) => state.product);

  const specProd = mappingSpec(productCatList);
  console.log(specProd);
  console.log(query);
  const clearAllFilters = () => {
    navigate({
      pathname: location.pathname,
      search: "",
    });
    setChecked([]);
    setSwitched(false);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex px-4 py-1 items-center ">
        <h5 className="text-xl flex-1 font-semibold">Filters</h5>
        <Button
          type="text"
          size="small"
          className="text-primary px-12 py-3 "
          onClick={clearAllFilters}
        >
          Clear all
        </Button>
      </div>
      <CollapseCheckbox
        key="brand"
        label="Brand"
        children={
          <Checkbox
            queryKey="brand"
            options={brandList.map((item) => item.name)}
            basePath={location.pathname}
            checkedValues={checked}
            onCheckedValuesChange={setChecked}
          />
        }
      />
      <CollapseCheckbox
        key="Color"
        label="Color"
        children={
          <Checkbox
            queryKey="color"
            options={colorList.map((item) => item.color)}
            basePath={location.pathname}
            checkedValues={checked}
            onCheckedValuesChange={setChecked}
          />
        }
      />
      <Switch
        title="discount"
        basePath={location.pathname}
        checked={switched}
        onCheckedChange={setSwitched}
      />
      {Object.keys(specProd).map((key) => (
        <CollapseCheckbox
          key={key}
          label={key}
          children={
            <Checkbox
              queryKey={key}
              options={specProd[key].map((value) => value)}
              basePath={location.pathname}
              checkedValues={checked}
              onCheckedValuesChange={setChecked}
            />
          }
        />
      ))}
    </div>
  );
};

export default FilterOptions;
