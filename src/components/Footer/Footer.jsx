import s from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerWrapper}>
        <div className={s.footerWrapperItem}>
          <h3 className={s.title}>My Phonebook v.1.0.0525</h3>
        </div>
        <div className={s.footerWrapperItem}></div>
        <div className={s.footerWrapperItem}></div>
      </div>
      <div className={s.text}>
        <p>Developer Andrii Semenenko - student of GoIt Ukraine - 08.05.2025</p>
      </div>
    </footer>
  );
};

export default Footer;
