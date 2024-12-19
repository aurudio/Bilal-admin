import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase/firebase'
import Delete from './modals/Delete'
import Edit from './modals/Edit'

function ProductList() {
	const [productKey, setProductKey] = useState('')
	const [product, setProduct] = useState(null)
	const [data, setData] = useState({})
	const nav = ['Фото', 'Название', 'Артикул', 'Категория', 'Сезон']
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
			<div className='relative overflow-x-auto w-[90%] m-auto rounded-2xl min-h-[85vh] bg-gray-700'>
				{isLoading ? ( // Если идёт загрузка, показываем индикатор
					<div className='flex justify-center items-center min-h-[85vh]'>
						<div className='loader rounded-[50%] w-28 h-28 border-[20px] border-transparent border-t-white'></div>
					</div>
				) : (
					<div>
						<div className={true !== 'qwerty' ? 'hidden' : 'bg-gray-700 px-5'}>
							<ul className='py-4 flex justify-between'>
								{nav.map((item, key) => (
									<li
										className='text-gray-400 font-bold  text-center '
										key={key}
									>
										{item}
									</li>
								))}
								<li className='text-gray-400 font-bold  text-center '>
									Изменения
								</li>
							</ul>
						</div>
						<div
							className={
								true !== 'qwerty'
									? 'hidden'
									: 'bg-gray-500 max-h-[78.2vh] overflow-y-scroll '
							}
						>
							{Object.entries(data).map(([key, value]) => (
								<ul
									key={key}
									className='flex items-center py-4 text-left text-lg border-b justify-between px-5'
								>
									<li className='text-gray-100 flex justify-center '>
										<img
											src={value.image}
											alt=''
											width={50}
											className='rounded-lg'
										/>
									</li>
									<li className='text-gray-100 text-center '>{value.title}</li>
									{/* <li className='text-gray-100 text-center max-'>
										{value.desc.slice(0, 3)}
									</li> */}
									<li className='text-gray-100 text-center '>
										{value.art_number}
									</li>
									<li className='text-gray-100 text-center '>
										{value.category}
									</li>
									<li className='text-gray-100 text-center '>{value.season}</li>
									<li className='text-gray-400 font-semibold text-center  text-base flex justify-between gap-4'>
										<button
											onClick={() => {
												setProductKey(key)
												setProduct(value)
												setEdit(true)
											}}
											className='py-1 px-3 hover:-translate-y-[1px] hover:shadow-md
							hover:shadow-[#c5c5c5] duration-200 active:translate-y-[0] active:shadow-none active:bg-orange-800 bg-orange-500 text-white rounded-md'
										>
											Edit
										</button>
										<button
											onClick={() => {
												setProductKey(key)
												setProduct(value)
												setDel(true)
											}}
											className='py-1 px-3 hover:-translate-y-[1px] hover:shadow-md
							hover:shadow-[#c5c5c5] duration-200 active:translate-y-[0] active:shadow-none active:bg-red-800 bg-red-500 text-white rounded-md'
										>
											Delete
										</button>
									</li>
								</ul>
							))}
						</div>
						<div></div>
					</div>
				)}
			</div>
		</>
	)
}

export default ProductList
