import styles from "./Sidebar.module.scss";
import { changeCategory, searchKettle } from "../../redux/kettlesPage";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";
import { useEffect } from "react/cjs/react.development";
import { getCategories } from "../../redux/selectors";
import { Link } from "react-router-dom";
import { useState } from "react";
import cn from "classnames";

const Sidebar = ({ categories, changeCategory, searchKettle, match }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    searchKettle(e.target.value);
  };

  useEffect(() => {
    changeCategory(match.params.category);
  }, [changeCategory, match]);
  return (
    <div className={styles.sidebar}>
      <input
        placeholder={"Поиск"}
        value={searchValue}
        onChange={(e) => handleSearch(e)}
      />
      <div className={styles.categories}>
        <div>
          <Link
            className={cn(styles.link, {
              [styles.active]: !match.params.category,
            })}
            to={"/kettles"}
          >
            all
          </Link>
        </div>
        {categories.map((category, index) => {
          return (
            <div  key={index}>
              <Link
                className={cn(styles.link, {
                  [styles.active]: category === match.params.category,
                })}
                to={`/kettles/${category}`}
              >
                {category}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: getCategories(state),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { changeCategory, searchKettle })
)(Sidebar);
