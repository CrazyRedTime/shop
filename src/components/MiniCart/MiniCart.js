import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCartPrice, getKettlesInCartCount } from "../../redux/selectors";
import styles from './MiniCart.module.scss';

const MiniCart = ({ kettlesCount, totalPrice }) => {
  return (
    <div className={styles.mainCart}>
      <Link to="/cart" className={styles.link}>
        <h2>Корзина</h2>
      </Link>
        <div className={styles.cart}>
          <span>Товаров: {kettlesCount}</span>
          <span>Стоимость: {totalPrice}₽</span>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    kettlesCount: getKettlesInCartCount(state),
    totalPrice: getCartPrice(state),
  };
};

export default connect(mapStateToProps, null)(MiniCart);
