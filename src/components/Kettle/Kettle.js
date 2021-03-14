import { connect } from "react-redux";
import { withRouter } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { compose } from "redux";
import { fetchKettleById } from "../../redux/kettles";
import { getKettleById } from "../../redux/selectors";
import styles from "./Kettle.module.scss";
import { addKettleToCart } from "../../redux/cart";
import MiniCart from "../MiniCart/MiniCart";
import { Link } from "react-router-dom";

const Kettle = ({ kettle, fetchKettleById, addKettleToCart, match }) => {
  useEffect(() => {
    fetchKettleById(match.params.id);
  }, [fetchKettleById, match]);

  const renderSideBar = () => {
    return (
      <div className={styles.sidebar}>
        <MiniCart />
        <Link className={styles.buttonBack} to="/kettles">Назад</Link>
      </div>
    );
  };

  const renderKettle = (kettle) => {

    return (
      <div className={styles.kettle}>
        <div className={styles.infoContainer}>
          <div>
            <img
              className={styles.image}
              src={kettle.image}
              alt={kettle.name}
            />
          </div>
          <div className={styles.info}>
            <h2>{kettle.name}</h2>
            <h3>Мощность: {kettle.power} ВТ</h3>
            <h3>Объём: {kettle.volume}л</h3>
            <h3>Материал: {kettle.material}</h3>
            <h3>Подсветка: {kettle.backlighting  ? "есть" : "нет"}</h3>
            <h3>Автоматическое выключение: {kettle.automaticShutdown  ? "есть" : "нет"}</h3>
            <h3>Фильтр: {kettle.filter ? "есть" : "нет"}</h3>
            <h2>{kettle.price}₽</h2>
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
        <div>
          <span>{kettle.description.full}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {kettle && renderKettle(kettle)}
      {renderSideBar()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    kettle: getKettleById(state, state.kettle.id),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchKettleById, addKettleToCart })
)(Kettle);
