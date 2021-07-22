import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <ul className="nav">
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
  );
}
