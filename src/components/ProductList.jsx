import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase/firebase'

function ProductList() {
	const [data, setData] = useState({})
	const nav = ['Фото', 'Название', 'Описание', 'Артикул', 'Категория', 'Сезон']
	const [isLoading, setIsLoading] = useState(true)

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
		<div className='relative overflow-x-auto w-[90%] m-auto rounded-2xl min-h-[85vh] bg-gray-700'>
			{isLoading ? ( // Если идёт загрузка, показываем индикатор
				<div className='flex justify-center items-center min-h-[85vh]'>
					<div className='loader rounded-[50%] w-28 h-28 border-[20px] border-transparent border-t-white'></div>
				</div>
			) : (
				<>
					<div className='bg-gray-700'>
						<ul className='flex py-4'>
							{nav.map((item, key) => (
								<li
									className='text-gray-400 font-bold  text-center w-[14.28%]'
									key={key}
								>
									{item}
								</li>
							))}
							<li className='text-gray-400 font-bold  text-center w-[14.28%]'>
								Изменения
							</li>
						</ul>
					</div>
					<div className='bg-gray-500 product-list min-h-[78.2vh] overflow-y-hidden'>
						{Object.entries(data).map(([key, value]) => (
							<ul
								key={key}
								className='flex items-center py-4 text-left text-lg border-b'
							>
								{console.log(key)}
								<li className='text-gray-100 flex justify-center w-[14.28%]'>
									<img
										src={value.image}
										alt=''
										width={50}
										className='rounded-lg'
									/>
								</li>
								<li className='text-gray-100 text-center w-[14.28%]'>
									{value.title}
								</li>
								<li className='text-gray-100 text-center max-w-[14.28%] overflow-x-scroll'>
									{value.desc}
									lqwertyuiop[;lkjhgfdsasdfghjm,mnbvcxzsdfgyjkjhgfds]
								</li>
								<li className='text-gray-100 text-center w-[14.28%]'>
									{value.art_number}
								</li>
								<li className='text-gray-100 text-center w-[14.28%]'>
									{value.category}
								</li>
								<li className='text-gray-100 text-center w-[14.28%]'>
									{value.season}
								</li>
								<li className='text-gray-400 font-semibold text-center w-[14.28%] text-base pr-5 flex justify-between'>
									<button
										className='py-1 px-3 hover:-translate-y-[1px] hover:shadow-md
							hover:shadow-[#c5c5c5] duration-200 active:translate-y-[0] active:shadow-none active:bg-orange-800 bg-orange-500 text-white rounded-md'
									>
										Edit
									</button>
									<button
										className='py-1 px-3 hover:-translate-y-[1px] hover:shadow-md
							hover:shadow-[#c5c5c5] duration-200 active:translate-y-[0] active:shadow-none active:bg-red-800 bg-red-500 text-white rounded-md'
									>
										Delete
									</button>
								</li>
							</ul>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default ProductList
