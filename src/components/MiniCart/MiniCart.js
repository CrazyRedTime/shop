import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCartPrice, getKettlesInCartCount } from "../../redux/selectors";
import styles from './MiniCart.module.scss';

const MiniCart = ({ kettlesCount, totalPrice }) => {
  return (
    <div>
      <Link to="/cart" className={styles.link}>
        <div className={styles.cart}>
          <span>Товаров: {kettlesCount}</span>
          <span>Стоимость: {totalPrice}₽</span>
        </div>
      </Link>
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
