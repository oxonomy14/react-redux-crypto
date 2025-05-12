import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <title>HomePage - My Phonebook</title>
      <div className={styles.container}>
        <h1 className={styles.title}>Contacts manager page</h1>
      </div>
    </>
  );
};

export default HomePage;
