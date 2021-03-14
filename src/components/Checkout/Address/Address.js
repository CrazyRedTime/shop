import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { updateAddress } from "../../../redux/checkout";
import CheckoutNavbar from "../CheckoutNavbar/CheckoutNavbar";
import styles from './Address.module.scss';

const Address = ({address, updateAddress}) => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [mustRedirect, setMustredirect] = useState(false);

  useEffect(() => {
    if (isSubmited) {
      setMustredirect(true);
    }
  }, [isSubmited]);

  const {
    register,
    errors,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "all",
    reValidateMode: "all",
    criteriaMode: "all",
  });
  const onSubmit = (data) => {
    updateAddress(data);
    setIsSubmited(true);
  };

  if (mustRedirect) {
    return <Redirect to="/payment" />;
  }

  return (
    <div>
      <CheckoutNavbar />
      <h1>Ваш адрес</h1>
      <form className={styles.addressForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Город
            <input
              name="city"
              placeholder="Ульяновск"
              defaultValue={address.city}
              maxLength={15}
              ref={register({
                validate: {
                  required: (value) => value.length > 0,
                  onlyLetters: (value) =>
                    new RegExp(/^[А-ЯЁа-яё-]+$/).test(value),
                  minLength: (value) => value.length >= 2,
                },
              })}
            />
            {errors.city?.type === "required" && <p>Это поле обязательно</p>}
            {errors.city?.type === "minLength" && <p>Минимум два символа</p>}
            {errors.city?.type === "onlyLetters" && (
              <p>Используейте только кириллицу</p>
            )}
          </label>
          <label>
            Улица
            <input
              name="street"
              placeholder="Гончарова"
              defaultValue={address.street}
              maxLength={15}
              ref={register({
                validate: {
                  required: (value) => value.length > 0,
                  onlyLetters: (value) =>
                    new RegExp(/^[А-ЯЁа-яё-]+$/).test(value),
                  minLength: (value) => value.length >= 2,
                },
              })}
            />
            {errors.street?.type === "required" && <p>Это поле обязательно</p>}
            {errors.street?.type === "minLength" && <p>Минимум два символа</p>}
            {errors.street?.type === "onlyLetters" && (
              <p>Используейте только кириллицу</p>
            )}
          </label>
          <label>
            Номер дома
            <input
              name="houseNumber"
              placeholder="1"
              defaultValue={address.houseNumber}
              maxLength={3}
              ref={register({
                validate: {
                  required: (value) => value.length > 0,
                  onlyNumbers: (value) =>
                    new RegExp(/^\d+$/).test(value),
                },
              })}
            />
            {errors.houseNumber?.type === "required" && <p>Это поле обязательно</p>}
            {errors.houseNumber?.type === "onlyNumbers" && (
              <p>Используейте только цифры</p>
            )}
          </label>
          <label>
            Корпус
            <input
              name="buildingNumber"
              type="number"
              defaultValue={address.buildingNumber}
              min="1"
              max="10"
              ref={register}
            />
          </label>
          <label>
            Квартира
            <input
              name="apartmentNumber"
              placeholder="1"
              defaultValue={address.apartmentNumber}
              maxLength={3}
              ref={register({
                validate: {
                  required: (value) => value.length > 0,
                  onlyNumbers: (value) =>
                    new RegExp(/^\d+$/).test(value),
                },
              })}
            />
            {errors.apartmentNumber?.type === "required" && <p>Это поле обязательно</p>}
            {errors.apartmentNumber?.type === "onlyNumbers" && (
              <p>Используейте только цифры</p>
            )}
          </label>
        </div>
        <button className={styles.buttonAction} disabled={!isValid}>Продолжить</button>
      </form>
      <div>
        <Link className={styles.back} to="/checkout">Назад</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.checkout.address
  }
}

export default connect(mapStateToProps, {updateAddress})(Address);
