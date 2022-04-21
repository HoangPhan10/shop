import styles from "./Account.module.scss";
import clsx from "clsx";

function Dowload() {
  return (
    <div className={clsx(styles.orderButton, styles.dowload)}>
      <button className={styles.Button} variant="danger">
        TỚI CỦA HÀNG{" "}
      </button>
      <p>Chưa có mục tải về</p>
    </div>
  );
}

export default Dowload;
