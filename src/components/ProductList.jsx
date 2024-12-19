import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase/firebase'
import Delete from './modals/Delete'
import Edit from './modals/Edit'

function ProductList() {
	const [productKey, setProductKey] = useState('')
	const [product, setProduct] = useState(null)
	const [data, setData] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [del, setDel] = useState(false)
	const [edit, setEdit] = useState(false)

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
			<Edit
				modal={edit}
				setModal={setEdit}
				productKey={productKey}
				setProductKey={setProductKey}
				product={product}
				setProduct={setProduct}
			/>
			<div className='relative overflow-x-auto w-[90%] m-auto rounded-2xl max-h-[85vh] bg-gray-700 overflow-scroll'>
				{isLoading ? (
					<div className='flex justify-center items-center min-h-[85vh]'>
						<div className='loader rounded-[50%] w-28 h-28 border-[20px] border-transparent border-t-white'></div>
					</div>
				) : (
					<div className='flex flex-wrap gap-10 p-10'>
						{Object.entries(data).map(([key, value]) => (
							<div
								key={key}
								className='w-52 flex-col items-center grid place-content-between p-5 gap-6 bg-slate-800 rounded-3xl cursor-pointer hover:-translate-y-px hover:shadow-lg hover:shadow-[rgb(0,0,0,0.4)] duration-500 hover:duration-300'
							>
								<img src={value.image} alt='' className='w-full rounded-xl' />
								<p className='text-white text-xl font-medium justify-self-center'>
									{value.title}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	)
}

export default ProductList
