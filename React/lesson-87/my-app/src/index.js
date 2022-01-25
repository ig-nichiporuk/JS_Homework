import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


/* это JSX элемент elem.

React может спокойно использоваться и без JSX, на стандартных инструментах JS
Аналог elem =>
const elem = React.createElement(название элеметнта: 'h2', название классов: null или 'перечислить классы', содержимое тега: 'Hello World!' ) */

let text = 'Hello'

const elem = (
	<div>
		<h2>Текст: {text}</h2>
		<h2 className={'asdasd'}>Текст: {2 + 2}</h2>
		<h2 className='test'>Текст: {10 + 2}</h2>
		<label htmlFor='rrrrr' className='test'>Label</label>
		<input type="text"/>
		<button>Click</button>
	</div>
); /* React элемент. Если простой, то <h2>Hello</h2>. Если многострочный, то ОБОРАЧИВАТЬ В () */

ReactDOM.render(
  elem,
  document.getElementById('root')
);
