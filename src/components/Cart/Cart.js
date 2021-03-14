import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeKettleCountInCart, deleteKettleFromCart } from "../../redux/cart";
import { getCartItems, getCartPrice } from "../../redux/selectors";
import styles from './Cart.module.scss';
import cn from 'classnames';

const Cart = ({totalPrice, kettlesInCart, changeKettleCountInCart, deleteKettleFromCart}) => {

  return (
    <div className={styles.cart}>
      {totalPrice ? kettlesInCart.map((kettle, index) => {
        return (
          <div key={index} className={styles.cartItem}>
            <img src={kettle.image} alt={kettle.name} className={styles.img}/>
            <div className={styles.cartCell}><Link className={styles.link} to={`/kettle/${kettle.id}`}>{kettle.name}</Link></div>
            <div className={styles.cartCell}><span>Стоимость: {kettle.price}₽</span></div>
            <div className={styles.cartCell}><span>Количество: </span><input type='number' value={kettle.count} onChange={(e) => changeKettleCountInCart(kettle.id, e.target.value)}/></div>
            <div className={styles.cartCell}>
              <button onClick={() => deleteKettleFromCart(kettle.id)}>удалить</button>
            </div>
          </div>
        )
      }) : <div>Ваша корзина пуста</div>}
     
      <div className={styles.priceContainer}>
        <span>Общая соимость: {totalPrice}₽</span>
      </div>
      <div className={styles.bottom}>
        <div className={styles.btn}><Link className={styles.link} to={'/kettles'}>Вернуться к покупкам</Link></div>
        <div className={styles.btn}><Link className={cn(styles.link, {
          [styles.disabledLink]: !totalPrice
        })} to='/checkout' >Оформить заказ</Link></div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    totalPrice: getCartPrice(state),
    kettlesInCart: getCartItems(state)
  }
}

export default connect(mapStateToProps, {deleteKettleFromCart, changeKettleCountInCart})(Cart);