import { deleteObject, ref } from 'firebase/storage'
import React, { useEffect } from 'react'
import { storage } from '../../firebase/firebase'

const Images = ({ modal, setModal, images, setImages }) => {
	useEffect(() => {
		if (!modal) return setImages([])
	}, [modal])

	const deleteImage = (url) => {
		const imageRef = ref(storage, url)
		console.log(url)

		deleteObject(imageRef)
			.then(() => {
				console.log('Файл успешно удален')
				setImages(images.pop())
				setImages([...images])
			})
			.catch((error) => {
				console.error('Ошибка при удалении файла:', error)
			})
	}

	return (
		<div
			className={`${
				modal
					? 'z-[100] opacity-100 backdrop-blur-[9px] duration-200'
					: '-z-10 opacity-0'
			} w-full h-full bg-[rgba(0,0,0,0.6)] fixed top-0 flex duration-200 justify-center items-center`}
			onClick={() => setModal(false)}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='w-4/5 h-4/5 flex items-start flex-wrap gap-x-16 gap-y-6 rounded-2xl bg-slate-700 p-16'
			>
				{images.map((item) => (
					<div className='relative'>
						<div className='absolute w-full h-full'></div>
						<img src={item} key={item} alt='' className='w-52 rounded-xl' />
					</div>
				))}
			</div>
		</div>
	)
}

export default Images
