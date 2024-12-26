import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase/firebase'
import Delete from './modals/Delete'
import Images from './modals/Images'
import Product from './Product'

function ProductList() {
	const [productKey, setProductKey] = useState('')
	const [data, setData] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [del, setDel] = useState(false)
	const [modal, setModal] = useState(false)
	const [images, setImages] = useState([])

	useEffect(() => {
		const dataRef = ref(database, '/')
		setIsLoading(true)
		const unsubscribe = onValue(
			dataRef,
			(snapshot) => {
				if (snapshot.exists()) {
					setData(snapshot.val())
					setIsLoading(false)
				} else {
					setData({})
				}
			},
			(error) => {
				console.error('Ошибка загрузки данных:', error)
				setIsLoading(false)
			}
		)

		return () => unsubscribe()
	}, [])

	return (
		<>
			<Delete
				modal={del}
				setModal={setDel}
				productKey={productKey}
				setProductKey={setProductKey}
			/>

			<Images
				modal={modal}
				setModal={setModal}
				images={images}
				setImages={setImages}
			/>
			<div className='relative overflow-x-auto w-[90%] m-auto rounded-2xl h-[85vh] bg-gray-700 overflow-scroll'>
				{isLoading ? (
					<div className='flex justify-center items-center min-h-[85vh]'>
						<div className='loader rounded-[50%] w-28 h-28 border-[20px] border-transparent border-t-white'></div>
					</div>
				) : (
					<div className='flex flex-wrap gap-10 p-10'>
						{Object.entries(data).map(([key, value]) => (
							<div key={key}>
								<Product
									setProductKey={setProductKey}
									setDel={setDel}
									id={key}
									product={value}
									setImages={setImages}
									setModal={setModal}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	)
}

export default ProductList
