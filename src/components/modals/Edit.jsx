import React from 'react'

const Edit = ({
	modal,
	setModal,
	productKey,
	setProductKey,
	product,
	setProduct,
}) => {
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
				className='w-[53rem] h-[44rem] text-center flex flex-col items-center gap-10 rounded-2xl bg-[#fffffe] py-32 px-20'
			>
				<h1 className='text-4xl font-bold '>Изменение товара</h1>
				<div className='flex gap-32'>
					<input type='text' />
					<input type='text' />
					<input type='text' />
					<input type='text' />
					<input type='text' />
					<input type='text' />
				</div>
			</div>
		</div>
	)
}

export default Edit
