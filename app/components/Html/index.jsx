import './index.styl';
import React from 'react';
import { Link } from 'react-router';

export default class Html extends React.Component {

	render() {

		return (
			<div>
				<header id="header">
					<div id="logo"></div>
					<nav id="nav">
						<Link to="/projekt" activeClassName="active" className="nav-link">Das Projekt</Link>
						<Link to="/helfen" activeClassName="active" className="nav-link">Wie kann ich helfen?</Link>
						<Link to="/stories" activeClassName="active" className="nav-link">Stories</Link>
						<Link to="/kontakt" activeClassName="active" className="nav-link">Kontakt</Link>
					</nav>
				</header>
				<div id="content">
					{this.props.children}
				</div>
			</div>

		)
	}
}
