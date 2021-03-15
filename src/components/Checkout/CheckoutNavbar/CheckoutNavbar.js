import { Link, withRouter } from "react-router-dom"
import cn from 'classnames';
import styles from './CheckoutNavbar.module.scss'
import { compose } from "redux";
import { connect } from "react-redux";
import { getAddressState, getDataState } from "../../../redux/selectors";

const CheckoutHeader = ({isDataSubmitted, isAddressSubmitted, match}) => {

  return (
    <ul className={styles.listCheckout}>
      <li>
        <Link className={cn(styles.link, {[styles.active]: match.path === '/checkout'})} to={'/checkout'}>Ваши данные</Link></li>
      <li><Link className={cn(styles.link, {
        [styles.active]: match.path === '/address_confirmation',
        [styles.disabledLink]: !isDataSubmitted
      })} to={'/address_confirmation'}>Адрес</Link></li>
      <li><Link className={cn(styles.link, {
        [styles.active]: match.path === '/payment',
        [styles.disabledLink]: !isAddressSubmitted
      })} to={'/payment'}>Оплата</Link></li>
    </ul>
  )
};

const mapStateToProps = (state) => {
  return {
    isDataSubmitted: getDataState(state),
    isAddressSubmitted: getAddressState(state)
  } 
}

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(CheckoutHeader);