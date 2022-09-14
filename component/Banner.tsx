import css from '../styles/Banner.module.css';

const Banner = () => {
  return (
    <div className={css.container}>
      <span className={css.text}>
        오늘 해야할 것을
        <br />
        기록하고 메모해보세요
      </span>
    </div>
  );
};

export default Banner;
