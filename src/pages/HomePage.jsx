import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'

function HomePage() {
	useEffect(() => {
		localStorage.setItem('images', '[]')
	}, [])
	return (
		<div className=''>
			<Navbar />
			<ProductList />
		</div>
	)
}

export default HomePage
