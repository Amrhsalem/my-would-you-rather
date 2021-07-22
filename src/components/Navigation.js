import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/questions">Home</Link>
        </li>
        <li>
          <Link to="/add">New Poll</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
      </ul>
    </div>
  );
}
