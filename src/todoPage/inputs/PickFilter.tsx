import {Dispatch, FC, SetStateAction} from "react";
import {FilterState} from "../App.tsx";

const PickFilter: FC<Props> = ({filter, setFilter}) => {
  const changeFilter = (filterNumber: number) => {
    if (filterNumber === filter) {
      return;
    }

    setFilter(filterNumber);
  };

  return (
      <div className="filter">
        <div
            className={filter === 0 ? "active" : ""}
            onClick={() => changeFilter(0)}
        >
          All
        </div>
        <div
            className={filter === 1 ? "active" : ""}
            onClick={() => changeFilter(1)}
        >
          Completed
        </div>
        <div
            className={filter === 2 ? "active" : ""}
            onClick={() => changeFilter(2)}
        >
          Uncompleted
        </div>
      </div>
  );
};

interface Props {
  filter: number;
  setFilter: Dispatch<SetStateAction<FilterState>>;
}

export default PickFilter;
