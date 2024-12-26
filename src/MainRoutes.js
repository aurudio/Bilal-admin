import React from 'react'
import { Route, Routes } from 'react-router'
import CrateProduct from './pages/CrateProduct'
import DetailPage from './pages/DetailPage'
import HomePage from './pages/HomePage'

const MainRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/list' element={<HomePage />} />
			<Route path='/add' element={<CrateProduct />} />
			<Route path='/product/:id' element={<DetailPage />} />
		</Routes>
	)
}

export default MainRoutes
