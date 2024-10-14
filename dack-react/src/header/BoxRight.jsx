import { useState } from "react";

const BoxRight = () => {
  const [clickSearch, setClickSearch] = useState(false);

  const handleClickSearch = () => {
    setClickSearch(!clickSearch);
  };

  return (
    <div className="box_right">
      <div className="sign">
        <span>Log In /</span>
        <span> Register</span>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          className={clickSearch ? "active" : ""}
        />
        <div className="icon" onClick={handleClickSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
};

export default BoxRight;
