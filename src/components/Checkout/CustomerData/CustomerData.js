import { useState, useEffect } from "react";
import { useForm} from "react-hook-form";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { updateCustomerData } from "../../../redux/checkout";
import styles from "./CustomerData.module.scss";
import { compose } from "redux";
import CheckoutNavbar from "../CheckoutNavbar/CheckoutNavbar";
import { getCustomerData } from "../../../redux/selectors";

const CustomerData = ({ data, updateCustomerData }) => {
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
    updateCustomerData(data);
    setIsSubmited(true);
  };

  if (mustRedirect) {
    return <Redirect to="/address_confirmation" />;
  }
  return (
    <>
      <CheckoutNavbar />
      <h1>Ваши данные</h1>
      <form className={styles.Mainform} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <label>
            Имя
            <input
              name="firstName"
              placeholder="Иван"
              maxLength={15}
              defaultValue={data.firstName}
              ref={register({
                validate: {
                  required: (value) => value.length > 0,
                  onlyLetters: (value) =>
                    new RegExp(/^[А-ЯЁа-яё]+$/).test(value),
                  minLength: (value) => value.length >= 2,
                },
              })}
            />
            {errors.firstName?.type === "required" && (
              <p>Это поле обязательно</p>
            )}
            {errors.firstName?.type === "minLength" && (
              <p>Минимум два символа</p>
            )}
            {errors.firstName?.type === "onlyLetters" && (
              <p>Используейте только кириллицу</p>
            )}
          </label>

          <label>
            Фамилия
            <input
              name="lastName"
              placeholder="Иванов"
              maxLength={20}
              defaultValue={data.lastName}
              ref={register({
                validate: {
                  required: (value) => value.length > 0,
                  onlyLetters: (value) =>
                    new RegExp(/^[А-ЯЁа-яё-]+$/).test(value),
                  minLength: (value) => value.length >= 2,
                },
              })}
            />
            {errors.lastName?.type === "required" && (
              <p>Это поле обязательно</p>
            )}
            {errors.lastName?.type === "minLength" && (
              <p>Минимум два символа</p>
            )}
            {errors.lastName?.type === "onlyLetters" && (
              <p>Используейте только кириллицу</p>
            )}
          </label>

          <label>
            Номер телефона
            <input
              name="phone"
              type="tel"
              placeholder="+7xxxxxxxxxx"
              maxLength={12}
              defaultValue={data.phone}
              ref={register({
                validate: {
                  required: (value) => value.length > 0,
                  validNumber: (value) =>
                    new RegExp(
                      /^\+?([7]{1})\)?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/
                    ).test(value),
                },
              })}
            />
            {errors.phone?.type === "required" && <p>Это поле обязательно</p>}
            {errors.phone?.type === "validNumber" && <p>Неверный формат</p>}
          </label>
        </div>
        <button className={styles.buttonAction} disabled={!isValid}>
          Продолжить
        </button>
      </form>
      <div>
        <Link className={styles.bac} to="/">
          Вернуться на главную
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: getCustomerData(state),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { updateCustomerData })
)(CustomerData);
