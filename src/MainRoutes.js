import React from 'react'
import { Route, Routes } from 'react-router'
import CrateProduct from './pages/CrateProduct'
import HomePage from './pages/HomePage'
import ImagesPage from './pages/ImagesPage'

const MainRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/add' element={<CrateProduct />} />
			<Route path='/images' element={<ImagesPage />} />
		</Routes>
	)
}

export default MainRoutes
