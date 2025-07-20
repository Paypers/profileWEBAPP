import MainInfo from './MainInfo';

function HomePage() {
  return (
    <div className="HomePage">
      {/* The <title> tag should be in the public/index.html file, not here */}
      <header className="HomePage-header">
        <h1>Welcome to Jay's Website</h1>
      </header>
      {/* The description, buttons, and carousel are now inside MainInfo */}
      <MainInfo />
    </div>
  );
}

export default HomePage;