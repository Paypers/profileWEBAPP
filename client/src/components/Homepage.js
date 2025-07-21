import MainInfo from './MainInfo';
import SocialTabs from './SocialTabs';
import '../cssFiles/HomePage.css';


function HomePage() {
  return (
    <div className="HomePage">
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Arvo" />
      {/* The <title> tag should be in the public/index.html file, not here */}
      <header className="HomePage-header">
        <h1>Welcome to Jay's Website</h1>
      </header>
      <SocialTabs />
      {/* The description, buttons, and carousel are now inside MainInfo */}
      <MainInfo />
    </div>
  );
}

export default HomePage;