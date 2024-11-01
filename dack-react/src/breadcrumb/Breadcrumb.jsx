import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const [pathHistory, setPathHistory] = useState([]); //danh sách đường dẫn

  //cập nhật lại đường dẫn mỗi khi location thay đổi
  useEffect(() => {
    setPathHistory((prevPathHistory) => {
      const newPathHistory = [...prevPathHistory, location.pathname];
      return Array.from(new Set(newPathHistory));
    });
  }, [location]);

  return (
    <div>
      {pathHistory.map((path, index) => (
        <span key={index}>
          <Link to={path}>{path === "/" ? "Trang chủ" : path}</Link>
          {index < pathHistory.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
