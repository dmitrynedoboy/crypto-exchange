import styles from '../../styles/Error.module.scss';

function Error({ message }: { message: string }) {
  return <p className={styles['error__message']}>{message}</p>;
}

export default Error;
