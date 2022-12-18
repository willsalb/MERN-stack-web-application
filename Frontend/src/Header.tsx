import "./Header.css";
import { Link } from "react-router-dom";

export function Header() {
	return (
		<div className="Header">
				<div className="container">
				<div>
					<a href="/">Home</a>
				</div>

				<div>
					<a href="/">Decks</a>
				</div>

				<div>
					<a href="/">Contacts</a>
				</div>
			</div>
		</div>
	)
}