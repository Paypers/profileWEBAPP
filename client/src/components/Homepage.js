import ImageCarousel from "./ImageCarousel";

function HomePage() {
  return (
    <div className="HomePage">
      <title>Jay's Website</title>
      <header className="HomePage-header">
        <h1>Welcome to Jay's Website</h1>
      </header>
        <p className="HomePage-description">
        This is a simple React application.
        Feel free to explore!
        </p>
        <ImageCarousel />
    </div>
  );
}

export default HomePage;