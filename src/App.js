import styles from "./app.module.css";
import { useState } from "react";

function App() {
  let [isValueVaild, setIsValueVaild] = useState(false);
  let [value, setValue] = useState(null);
  let [list, setList] = useState([]);
  let [error, setError] = useState(null);

  const onInputButtonClick = () => {
    const promptValue = prompt("Введите значение");
    if (promptValue.length < 3) {
      setIsValueVaild(false);
      setError("Введенное значение должно содержать минимум 3 символа");
      setValue(null);
    } else {
      setIsValueVaild(true);
      setError(null);
      setValue(promptValue);
    }
  };

  const onAddButtonClick = () => {
    if (isValueVaild) {
      const id = Date.now();
      const updatedList = [...list, { id, value }];
      setList(updatedList);
      setError(null);
      setValue("");
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles["page-heading"]}>Ввод значения</h1>
      <p className={styles["no-margin-text"]}>
        Текущее значение <code>value</code>: "
        <output className={styles["current-value"]}>{value}</output>"
      </p>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles["buttons-container"]}>
        <button className={styles.button} onClick={onInputButtonClick}>
          Ввести новое
        </button>
        <button
          className={styles.button}
          disabled={!isValueVaild}
          onClick={onAddButtonClick}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles["list-container"]}>
        <h2 className={styles["list-heading"]}>Список:</h2>
        {!list.length && (
          <p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
        )}

        <ul className={styles.list}>
          {list.map(({ id, value }) => (
            <li key={id} className={styles["list-item"]}>
              {value +
                " " +
                new Date(id).toLocaleDateString("ru-RU") +
                " " +
                new Date(id).toLocaleTimeString("ru-RU")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
