import styles from '../../styles/Wallet.module.scss';

function Wallet({ title }: { title: string }) {
  return (
    <div className={styles['wallet']}>
      <label htmlFor="wallet">Your {title} address</label>
      <input name="wallet" type="text" className={styles['wallet__input']} />
    </div>
  );
}

export default Wallet;
