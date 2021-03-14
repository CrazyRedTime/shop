import { Link, withRouter } from "react-router-dom"
import cn from 'classnames';
import styles from './CheckoutNavbar.module.scss'
import { compose } from "redux";
import { connect } from "react-redux";

const CheckoutHeader = ({isDataSubmitted, isAddressSubmitted, match}) => {
  console.log(isDataSubmitted, isAddressSubmitted);

  return (
    <ul>
      <li><Link className={cn(styles.link, {
        [styles.active]: match.path === '/checkout'
      })} to={'/checkout'}>Ваши данные</Link></li>
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
    isDataSubmitted: state.checkout.customerData.isSubmitted,
    isAddressSubmitted: state.checkout.address.isSubmitted
  } 
}

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(CheckoutHeader);