import logo from './logo.svg';
import './App.css';
import React from 'react'; // import {Component} from 'react';

const Header = () => {
	return <h2>Hello world!</h2>
}

/*
Функциональные компоненты

const Field = () => {
	const holder = 'Enter here';
	const styledField = {
		width : '300px'
	}
	return <input type="text" placeholder={holder} style={styledField}/>;
}

*/

/* Классовые компоненты */

class Field extends React.Component { // class Field extends Component  см. выше
	render() {
		const holder = 'Enter here';
		const styledField = {
			width : '300px'
		}

		return <input type="text" placeholder={holder} style={styledField}/>;
	}
}


function Btn () {
	const text = 'Log in';
	/*
	const res = ()=> {
		return 'Log in'
	};
	const p = <p>Log in</p>;
	*/

	const logged = true;

	return <button>{logged ? 'Enter' : text}</button>;
}

function App() {
	return (
		<div className="App">
			<Header/>
			<Field/>
			<Btn/>
		</div>
	);
}

export {Header};
export default App;
