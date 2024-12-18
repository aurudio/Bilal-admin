import { push } from 'firebase/database'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import { database, refDb, storage } from '../firebase/firebase'
import Navbar from './Navbar'

const AddProduct = () => {
	const filePicker = useRef(null)
	const [isLoading, setIsLoading] = useState(false)
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [art_number, setArt_Number] = useState('')
	const [category, setCategory] = useState('')
	const [season, setSeason] = useState('')
	const [images, setImages] = useState([])
	const inputs = [
		{ state: title, setState: setTitle, placeholder: 'Название' },
		{ state: desc, setState: setDesc, placeholder: 'Описание' },
		{ state: art_number, setState: setArt_Number, placeholder: 'Артикул' },
		{ state: category, setState: setCategory, placeholder: 'Категория' },
		{ state: season, setState: setSeason, placeholder: 'Сезон' },
	]

	useEffect(() => {
		const images = localStorage.getItem('images')
		setImages(JSON.parse(images))
	}, [])

	function handlePick() {
		filePicker.current.click()
	}

	const getImage = (file) => {
		if (images.length >= 10) {
			return alert('Вы добавили максимальное количество фото')
		}
		const fileName = new Date().getTime() + file.name // Уникальное имя файла
		const storageRef = ref(storage, fileName) // Ссылка на файл в хранилище
		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				switch (snapshot.state) {
					case 'paused':
						setIsLoading(true)
						console.log('Upload is paused')
						break
					case 'running':
						setIsLoading(true)
						console.log('Upload is running')

						break
					default:
						break
				}
			},
			(error) => {
				console.error('Upload error:', error)
			},
			() => {
				setIsLoading(false)
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImages(images.concat([downloadURL]))
					localStorage.setItem(
						'images',
						JSON.stringify(images.concat([downloadURL]))
					)
				})
			}
		)
		setIsLoading(false)
	}

	function addProductToDb() {
		if (
			!title.trim() ||
			!desc.trim() ||
			!art_number.trim() ||
			!category.trim() ||
			!season.trim()
		) {
			alert('Заполните все поля')
			return
		}

		const obj = {
			title,
			desc,
			art_number,
			category,
			season,
			image: images,
		}
		const dbRef = refDb(database, `/`)

		push(dbRef, obj)
			.then(() => {
				console.log('Object added successfully!', obj)
				setTitle('')
				setDesc('')
				setArt_Number('')
				setCategory('')
				setSeason('')
				setImages([])
				localStorage.removeItem('images')
			})
			.catch((error) => {
				console.error('Error adding object:', error)
			})
	}

	return (
		<>
			<Navbar />
			<div className='relative overflow-x-auto w-[90%] m-auto rounded-2xl max-h-[85vh] bg-gray-700 px-7 pt-0 pb-8'>
				<h1 className='text-5xl mt-5 mb-6 text-center font-bold text-white'>
					Добавление товара
				</h1>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-6'>
						{inputs.map((item, key) => (
							<input
								key={key}
								type='text'
								value={item.state}
								onChange={(e) => item.setState(e.target.value)}
								className=' input'
								placeholder={'Введите ' + item.placeholder}
							/>
						))}
						<input
							type='file'
							className='hidden'
							placeholder='Введите '
							ref={filePicker}
							accept='image/*,.png,.jpg,.web'
							onChange={(e) => {
								getImage(e.target.files[0])
							}}
						/>
						<button
							disabled={images.length >= 10 ? true : false}
							onClick={handlePick}
							className={
								images.length >= 10
									? 'input active:bg-white active:text-black duration-100 cursor-not-allowed'
									: 'input active:bg-white active:text-black duration-100'
							}
						>
							Выбрать фото
						</button>
					</div>
					<div className=''>
						<div className='w-96 h-96 bg-gray-800 rounded-xl overflow-hidden'>
							{isLoading ? (
								<div className='flex justify-center items-center m-auto min-h-[85vh]'>
									<div className='loader rounded-[50%] w-28 h-28 border-[20px] border-transparent border-t-white'></div>
								</div>
							) : (
								<img
									src={images[images.length - 1]}
									alt=''
									className='w-full h-full scale-[1.01]'
								/>
							)}
						</div>
						<p className='text-center mt-4 text-xl text-white'>
							{images.length}/10
						</p>
					</div>
				</div>
				<div className='flex mt-16 justify-end items-end'>
					<button
						className='w-[33%] bg-my-cyan hover:-translate-y-[1px] hover:shadow-md hover:shadow-[#828282] duration-200 active:translate-y-[0] active:shadow-none active:bg-my-dark-cyan py-2 px-10 text-white font-bold  rounded-full'
						onClick={addProductToDb}
					>
						Добавить
					</button>
				</div>
			</div>
		</>
	)
}

export default AddProduct
