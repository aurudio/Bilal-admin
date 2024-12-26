import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import { database } from '../firebase/firebase'

const DetailPage = () => {
	const [product, setProduct] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const { id } = useParams()

	useEffect(() => {
		const dataRef = ref(database, '/' + id)

		setIsLoading(true)
		const unsubscribe = onValue(
			dataRef,
			(snapshot) => {
				if (snapshot.exists()) {
					setProduct(snapshot.val())
					setIsLoading(false)
				} else {
					setProduct({})
				}
			},
			(error) => {
				console.error('Ошибка загрузки данных:', error)
				setIsLoading(false)
			}
		)
		return () => unsubscribe()
	}, [id])

	return (
		<div>
			<Navbar />
			<div className='relative overflow-x-auto w-[90%] m-auto rounded-2xl max-h-[85vh] bg-gray-700 overflow-scroll'>
				{product ? (
					<div>
						{isLoading ? (
							<div className='flex justify-center items-center min-h-[85vh]'>
								<div className='loader rounded-[50%] w-28 h-28 border-[20px] border-transparent border-t-white'></div>
							</div>
						) : (
							<Product product={product} />
						)}
					</div>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default DetailPage
