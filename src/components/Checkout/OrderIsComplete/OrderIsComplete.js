import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAddress, getCustomerData } from "../../../redux/selectors";
import styles from './OrderIsComplete.module.scss'

const OrderIsComplete = ({data, address}) => {
  return (
    <div className={styles.finish}>
      <h1>Заказ оплачен</h1>
      <div className={styles.itemOrder}>
        <h3>Получатель:</h3>
        <span>{`${data.lastName} ${data.firstName}`}</span>
      </div>
      <div className={styles.itemOrder}>
        <h3>Доставка по адресу:</h3>
        <span>{`г.${address.city}, ул.${address.street}, д.${address.houseNumber}${address.buildingNumber ? `, к.${address.buildingNumber}` : '' }, кв.${address.apartmentNumber}`}</span>
      </div>
      <Link className={styles.buttonBack} to='/'>Вернуться на главную</Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: getCustomerData(state),
    address: getAddress(state),
  };
};

export default connect(mapStateToProps, null)(OrderIsComplete);
