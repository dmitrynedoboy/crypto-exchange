import Image from 'next/image';
import { useState, Dispatch, SetStateAction } from 'react';

import { ARROW, CROSS } from '../../utils/svg';
import { ICurrency } from '../../interfaces/ICurrency';

import styles from '../../styles/Dropdown.module.scss';

interface IDropdownOptions {
  currency: ICurrency;
  changeCurrency: Dispatch<SetStateAction<ICurrency>>;
  amount: number | '-';
  changeAmount(amount: number | '-'): void;
  isDisabled: boolean;
  currencyList: ICurrency[] | undefined;
}

export default function Dropdown({
  currency,
  changeCurrency,
  amount,
  changeAmount,
  isDisabled,
  currencyList
}: IDropdownOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  // Обработчик изменения валюты
  const onCurrencyChanged = (currency: ICurrency) => () => {
    changeCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      {!isOpen ? (
        <>
          <input
            className={styles['dropdown__input']}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(event) => {
              !isDisabled && changeAmount(Number(event.target.value));
            }}
            disabled={isDisabled}
          />
          <div className={styles['dropdown__container']} onClick={toggling}>
            <div className={styles['dropdown-header']}>
              <div className={styles['dropdown-header__logo']}>
                <Image
                  src={currency?.image}
                  alt={`${currency?.image} logo`}
                  width="20px"
                  height="20px"
                />
              </div>
              <span className={styles['dropdown-header__currency']}>
                {currency?.ticker.toUpperCase()}
              </span>
              <span className={styles['dropdown-header__icon']}>
                {isOpen ? CROSS : ARROW}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className={styles['dropdown-items']}>
          <div className={styles['dropdown-list']}>
            <div className={styles['dropdown-list-header']} onClick={toggling}>
              <div className={styles['dropdown-list-header__container']}>
                <span className={styles['dropdown-list-header__text']}>
                  Choose currency
                </span>
                <span className={styles['dropdown-header__icon']}>
                  {isOpen ? CROSS : ARROW}
                </span>
              </div>
            </div>
            <ul className={styles['dropdown-list__container']}>
              {currencyList?.map((currency) => (
                <li
                  className={styles['dropdown-list__item']}
                  onClick={onCurrencyChanged(currency)}
                  key={currency.ticker}
                >
                  <div className={styles['dropdown-list__logo']}>
                    <Image
                      src={currency?.image}
                      alt={`${currency?.image} logo`}
                      width="20px"
                      height="20px"
                      layout="fixed"
                    />
                  </div>
                  <span className={styles['dropdown-list__currency']}>
                    {currency?.ticker.toUpperCase()}
                  </span>
                  <span className={styles['dropdown-list__name']}>
                    {currency?.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
