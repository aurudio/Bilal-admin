import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const ImagesPage = () => {
	const [images, setImages] = useState([])

	useEffect(() => {
		const images = localStorage.getItem('images')
		setImages(JSON.parse(images))
	}, [])

	console.log(images)

	return (
		<div>
			<Navbar />
			<div className='relative overflow-x-auto w-[90%] m-auto rounded-2xl max-h-[85vh] bg-gray-700 px-7 pt-0 pb-8'>
				{images.map((item, key) => (
					<img src={item} key={key} alt='' className='w-48' />
				))}
			</div>
		</div>
	)
}

export default ImagesPage
