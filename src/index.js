import React from 'react'
import {render} from 'react-dom'
import Root from './containers/Root'

document.addEventListener('DOMContentLoaded', function(){
	render(
		<Root />,
		document.getElementById('app')
	)
})