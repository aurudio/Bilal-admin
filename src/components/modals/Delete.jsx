import { ref, remove } from 'firebase/database'
import React from 'react'
import { database } from '../../firebase/firebase'

const Delete = ({ modal, setModal, productKey, setProductKey }) => {
	const deleteObject = async () => {
		const objectRef = ref(database, `/${productKey}`)
		try {
			await remove(objectRef)
			console.log('Object successfully deleted!')
		} catch (error) {
			console.error('Error removing object: ', error)
		}
		setProductKey('')
	}

	return (
		<div
			className={`${
				modal
					? 'z-10 opacity-100 backdrop-blur-[9px] duration-200'
					: '-z-10 opacity-0'
			} w-full h-full bg-[rgba(0,0,0,0.6)] fixed top-0 flex duration-200 justify-center items-center`}
			onClick={() => setModal(false)}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='w-[53rem] h-[23rem] text-center flex flex-col items-center gap-10 rounded-2xl bg-[#fffffe] py-32 px-20'
			>
				<h1 className='text-4xl font-bold '>
					Вы хотите удалить выбранный товар?
				</h1>
				<div className='flex gap-32'>
					<button
						className='py-2 px-10 text-black font-bold  rounded-full bg-transparent hover:-translate-y-[1px] hover:shadow-md hover:shadow-[#828282] duration-200 active:translate-y-[0] active:shadow-none active:bg-black active:text-white active:border-black border-2 border-black'
						onClick={() => {
							setModal(false)
							setProductKey('')
						}}
					>
						Нет
					</button>
					<button
						onClick={deleteObject}
						className='py-2 px-10 text-white font-bold  rounded-full bg-red-500 hover:-translate-y-[1px] hover:shadow-md hover:shadow-[#828282] duration-200 active:translate-y-[0] active:shadow-none active:bg-red-700 border-2 border-transparent '
					>
						Да
					</button>
				</div>
			</div>
		</div>
	)
}

export default Delete
