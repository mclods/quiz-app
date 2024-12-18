import classes from './Header.module.css';
import logo from '../assets/quiz-logo.png';

function Header() {
  return (
    <header
      className="flex flex-col items-center gap-y-3 my-12"
      data-testid="header-container"
    >
      <img
        src={logo}
        alt="A quiz clipboard"
        className="w-16 h-16 drop-shadow-[0_0_3px_rgb(0,0,0)]"
        data-testid="header-logo"
      />
      <p
        className={`font-parkinsans font-semibold text-5xl text-purple-300 tracking-wider lowercase ${classes.titleShadow}`}
        data-testid="header-title"
      >
        Quiz App
      </p>
    </header>
  );
}

export default Header;
