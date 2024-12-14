import { push } from 'firebase/database'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { database, refDb, storage } from '../firebase/firebase'

const AddProduct = () => {
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [art_number, setArt_Number] = useState('')
	const [category, setCategory] = useState('')
	const [season, setSeason] = useState('')

	const [file, setFile] = useState(null)
	const filePicker = useRef(null)

	function handlePick() {
		filePicker.current.click()
	}

	function addProductToDb() {
		if (
			!title.trim() ||
			!desc.trim() ||
			!art_number.trim() ||
			!category.trim() ||
			!season.trim() ||
			!file
		) {
			alert('Заполните все поля')
			return
		}

		const fileName = new Date().getTime() + file.name // Уникальное имя файла
		const storageRef = ref(storage, fileName) // Ссылка на файл в хранилище
		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused')
						break
					case 'running':
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
				// Когда загрузка завершена
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const obj = {
						id: new Date().getTime(),
						title,
						desc,
						art_number,
						category,
						season,
						image: downloadURL, // Ссылка на изображение
					}
					const dbRef = refDb(database, `/`) // Ссылка на узел "products"

					push(dbRef, obj)
						.then(() => {
							console.log('Object added successfully!', obj)
							setTitle('')
							setDesc('')
							setArt_Number('')
							setCategory('')
							setSeason('')
							setFile(null)
						})
						.catch((error) => {
							console.error('Error adding object:', error)
						})
				})
			}
		)
	}

	return (
		<div className='relative overflow-x-auto w-[90%] m-auto rounded-2xl min-h-[85vh] bg-gray-700 px-7 pt-0'>
			<h1 className='text-5xl mt-5 mb-6 text-center font-bold text-white'>
				Добавление товара
			</h1>
			<div className='flex justify-between'>
				<div className='flex flex-col gap-6'>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className=' w-[38vw] bg-transparent rounded-full border-2 border-white px-4 py-3 placeholder:text-gray-300 text-white font-medium'
						placeholder='Введите название'
					/>
					<input
						type='text'
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
						className=' w-[38vw] bg-transparent rounded-full border-2 border-white px-4 py-3 placeholder:text-gray-300 text-white font-medium'
						placeholder='Введите описание'
					/>
					<input
						type='text'
						value={art_number}
						onChange={(e) => setArt_Number(e.target.value)}
						className=' w-[38vw] bg-transparent rounded-full border-2 border-white px-4 py-3 placeholder:text-gray-300 text-white font-medium'
						placeholder='Введите артикул'
					/>
					<input
						type='text'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className=' w-[38vw] bg-transparent rounded-full border-2 border-white px-4 py-3 placeholder:text-gray-300 text-white font-medium'
						placeholder='Введите категорию'
					/>
					<input
						type='text'
						value={season}
						onChange={(e) => setSeason(e.target.value)}
						className=' w-[38vw] bg-transparent rounded-full border-2 border-white px-4 py-3 placeholder:text-gray-300 text-white font-medium'
						placeholder='Введите сезон'
					/>
					<input
						type='file'
						className=' w-[38vw]  hidden bg-transparent rounded-full border-2 border-white px-4 py-3 placeholder:text-gray-300 text-white font-medium'
						placeholder='Введите '
						ref={filePicker}
						accept='image/*,.png,.jpg,.web'
						onChange={(e) => {
							setFile(e.target.files[0])
						}}
					/>
					<button
						onClick={handlePick}
						className=' w-[38vw] rounded-full border-2 border-white px-4 py-3 placeholder:text-gray-300 text-white font-medium active:bg-white active:text-black duration-100'
					>
						Выбрать фото
					</button>
				</div>
				<div className='w-96 h-96 bg-gray-800 rounded-xl overflow-hidden'>
					<img src={''} alt='' className='' />
				</div>
			</div>
			<div className='flex mt-16 justify-end items-end'>
				<button
					className='w-[38%] bg-my-cyan hover:-translate-y-[1px] hover:shadow-md hover:shadow-[#828282] duration-200 active:translate-y-[0] active:shadow-none active:bg-my-dark-cyan py-2 px-10 text-white font-bold  rounded-full'
					onClick={addProductToDb}
				>
					Добавить
				</button>
			</div>
		</div>
	)
}

export default AddProduct
