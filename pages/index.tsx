import { useEffect, useState } from 'react';

import Button from '../components/Button';
import Error from '../components/Error';
import Wallet from '../components/Wallet';
import Dropdown from '../components/Dropdown';
import LoadingSpinner from '../components/LoadingSpinner';

import {
  BASIC_FROM,
  BASIC_TO,
  WAIT_INTERVAL,
  DISABLE_ERROR,
  MIN_ERROR,
  API_ERROR
} from '../utils/constants';
import { SWAP_CURRENCY } from '../utils/svg';
import {
  getMinAmount,
  getEstimatedAmount,
  getCurrencyList
} from '../utils/api_requests';
import { ICurrency } from '../interfaces/ICurrency';

import styles from '../styles/Home.module.scss';

interface IHomeProps {
  minAmount: number;
  estimatedAmount: number;
  currencyList: ICurrency[];
  error: string | null;
}

const Home = ({
  minAmount,
  estimatedAmount,
  currencyList,
  error
}: IHomeProps) => {
  const [fromCurrency, setFromCurrency] = useState<ICurrency>(BASIC_FROM);
  const [toCurrency, setToCurrency] = useState<ICurrency>(BASIC_TO);

  const [fromList, setFromList] = useState<ICurrency[] | undefined>();
  const [toList, setToList] = useState<ICurrency[] | undefined>();

  const [fromAmount, setFromAmount] = useState<number | '-'>(minAmount);
  const [toAmount, setToAmount] = useState<number | '-'>(estimatedAmount);

  const [minAmountState, setMinAmountState] = useState<number>(minAmount);
  const [isCurrencyChanged, setIsCurrencyChanged] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(error);

  // функция убирает выбранную валюту из списка
  const filterCurrencyList = (
    list: ICurrency[],
    fromCurr: ICurrency,
    toCurr: ICurrency
  ) => {
    const from = list.filter((currency) => currency.ticker !== toCurr.ticker);
    const to = list.filter((currency) => currency.ticker !== fromCurr.ticker);
    setFromList(from);
    setToList(to);
  };

  // определяем базовую пару валют при загрузке
  useEffect(() => {
    setIsLoading(true);
    filterCurrencyList(currencyList, BASIC_FROM, BASIC_TO);
  }, []);

  // обновляем значения при изменении суммы
  useEffect(() => {
    setErrorMessage(null);
    let timer = setTimeout(async () => {
      setIsLoading(true);
      if (fromAmount >= minAmountState) {
        try {
          const estimatedAmount = await getEstimatedAmount(
            fromAmount,
            fromCurrency.ticker,
            toCurrency.ticker
          );
          setToAmount(estimatedAmount);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setErrorMessage(API_ERROR);
          setIsLoading(false);
        }
      } else {
        setToAmount('-');
        setErrorMessage(MIN_ERROR);
        setIsLoading(false);
      }
    }, WAIT_INTERVAL);

    return () => clearTimeout(timer);
  }, [fromAmount, isCurrencyChanged]);

  // обновляем значения при изменении валюты
  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);
    let timer = setTimeout(async () => {
      try {
        const { minAmount, error } = await getMinAmount(
          fromCurrency.ticker,
          toCurrency.ticker
        );
        if (error) {
          setErrorMessage(DISABLE_ERROR);
          setIsLoading(false);
        } else {
          setFromAmount(minAmount);
          setMinAmountState(minAmount);
          setIsCurrencyChanged((prev) => !prev);
          filterCurrencyList(currencyList, fromCurrency, toCurrency);
        }
        setFromAmount(minAmount);
        setMinAmountState(minAmount);
        filterCurrencyList(currencyList, fromCurrency, toCurrency);
      } catch (error) {
        console.error(error);
        setErrorMessage(API_ERROR);
        setIsLoading(false);
      }
    }, WAIT_INTERVAL);

    return () => clearTimeout(timer);
  }, [fromCurrency, toCurrency]);

  // обработчик кнопки "Поменять валюты местами"
  const handleSwap = () => {
    setIsLoading(true);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <main className={styles['exchange']}>
      <h1 className={styles['exchange__header']}>Crypto Exchange</h1>
      <h2 className={styles['exchange__description']}>
        Exchange fast and easy
      </h2>
      <div className={styles['container']}>
        <Dropdown
          currency={fromCurrency}
          changeCurrency={setFromCurrency}
          amount={fromAmount}
          changeAmount={setFromAmount}
          isDisabled={false}
          currencyList={fromList}
        />
        <div className={styles['container__swap']} onClick={handleSwap}>
          {SWAP_CURRENCY}
        </div>
        <Dropdown
          currency={toCurrency}
          changeCurrency={setToCurrency}
          amount={toAmount}
          changeAmount={setToAmount}
          isDisabled={true}
          currencyList={toList}
        />
      </div>
      <div
        className={`${styles['container']} ${styles['container_align_end']}`}
      >
        <Wallet title={toCurrency?.name} />
        <Button />
      </div>
      {errorMessage && <Error message={errorMessage} />}
      {isLoading && <LoadingSpinner />}
    </main>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const [{ minAmount }, currencyList] = await Promise.all([
      getMinAmount(BASIC_FROM.ticker, BASIC_TO.ticker),
      getCurrencyList()
    ]);

    const estimatedAmount = await getEstimatedAmount(
      minAmount,
      BASIC_FROM.ticker,
      BASIC_TO.ticker
    );

    return {
      props: {
        minAmount,
        estimatedAmount,
        currencyList
      }
    };
  } catch (error) {
    return {
      props: {
        error
      }
    };
  }
}
