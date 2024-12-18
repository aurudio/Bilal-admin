import { useState } from 'react'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'

function HomePage() {
	const [view, setView] = useState('list')

	return (
		<div className=''>
			<Navbar />
			<ProductList />
		</div>
	)
}

export default HomePage
