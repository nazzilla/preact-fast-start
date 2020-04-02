

import { render, h, Component} from 'preact'
import { Router } from 'preact-router';

const App = () => {

	return <h1>Ready</h1>
}
const target = document.getElementById('root') ;
render( <App />, target)