import Layout from '../components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="about-container">
        <h1 className="about-title">About Me</h1>
        <div className="about-content">
          <div className="about-photo">
            <img src="../public/face.jpg" alt="" />
          </div>
          <div className="about-text">
            <p>
              Hello everyone! My name is Timofey. I’m 18 years old and I live in
              Tatarstan, Russia.
            </p>
            <p>
              I became interested in programming when I was 14. Since then, I’ve
              been working hard to achieve my goal of becoming the best
              developer.
            </p>
            <p>I hope I can make it!</p>
            <p>
              Learn more about the course:{' '}
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
              >
                RS School React Course
              </a>
            </p>
            <p>
              My GitHub:{' '}
              <a
                href="https://github.com/tim1234444"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/tim1234444
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
