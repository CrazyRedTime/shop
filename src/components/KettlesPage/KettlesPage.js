import { useEffect } from "react";
import { connect } from "react-redux";
import { getKettles } from "../../redux/selectors";
import Sidebar from "../Sidebar/Sidebar";
import { fecthKettles } from "./../../redux/kettles";
import styles from "./KettlesPage.module.scss";
import { Link } from "react-router-dom";
import { addKettleToCart } from "../../redux/cart";
import MiniCart from "../MiniCart/MiniCart";

const KettlesPage = ({ kettles, fecthKettles, addKettleToCart }) => {
  const renderKettle = (kettle, index) => {
    return (
      <div key={index} className={styles.kittle}>
        <div className={styles.top}>
          <img src={kettle.image} alt={kettle.name} className={styles.img} />
          <div className={styles.helper}>
            <div className={styles.info}>
              <div>
                <Link className={styles.link} to={`/kettle/${kettle.id}`}>
                  <h3 className={styles.title}>{kettle.name}</h3>
                </Link>
                <h4>Мощность: {kettle.power} ВТ</h4>
                <h4>Объём: {kettle.volume}л</h4>
                <h2>{kettle.price}₽</h2>
              </div>
            </div>
            <div className={styles.cartBtn}>
              <button
                className={styles.btn}
                onClick={() => addKettleToCart(kettle.id)}
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.description}>{kettle.description.short}</span>
        </div>
      </div>
    );
  };
  useEffect(() => {
    fecthKettles();
  }, [fecthKettles]);

  return (
    <div className={styles.main}>
      <div>{kettles.map((kettle, index) => renderKettle(kettle, index))}</div>
      <div>
        <MiniCart />
        <Sidebar />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    kettles: getKettles(state),
  };
};

export default connect(mapStateToProps, { fecthKettles, addKettleToCart })(
  KettlesPage
);
