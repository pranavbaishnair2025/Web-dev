import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page not-found">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="primary-btn">
        Return Home
      </Link>
    </div>
  );
}
