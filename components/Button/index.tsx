import styles from '../../styles/Button.module.scss';

function index() {
  return (
    <button className={styles['button']}>
      <span className={styles['button__text']}>EXCHANGE</span>
    </button>
  );
}

export default index;
