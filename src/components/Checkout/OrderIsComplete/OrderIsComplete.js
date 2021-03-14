import { connect } from "react-redux";
import { Link } from "react-router-dom";

const OrderIsComplete = ({data, address}) => {
  return (
    <div>
      <h1>Заказ оплачен</h1>
      <div>
        <h3>Получатель:</h3>
        <span>{`${data.lastName} ${data.firstName}`}</span>
      </div>
      <div>
        <h3>Доставка по адресу:</h3>
        <span>{`г.${address.city}, ул.${address.street}, д.${address.houseNumber}${address.buildingNumber ? `, к.${address.buildingNumber}` : '' }, кв.${address.apartmentNumber}`}</span>
      </div>
      <Link to='/'>Вернуться на главную</Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.checkout.customerData,
    address: state.checkout.address,
  };
};

export default connect(mapStateToProps, null)(OrderIsComplete);
