import 'flowbite'
import React, { useState } from 'react'

const Product = ({
	setProductKey,
	setDel,
	id,
	product,
	setImages,
	setModal,
}) => {
	const [detail, setDetail] = useState(false)
	const [hover, setHover] = useState(false)

	return (
		<div
			className={`
					${
						detail ? '' : 'w-[16.5rem]'
					} p-5 bg-slate-800 gap-6 rounded-3xl cursor-pointer hover:-translate-y-px hover:shadow-lg hover:shadow-[rgb(0,0,0,0.4)] duration-500 hover:duration-300 text-white overflow-hidden 
					`}
			onClick={() => setDetail(!detail)}
		>
			<div
				className={`${detail ? 'hidden' : ''} flex flex-col items-center gap-6`}
			>
				<img
					src={product.image}
					alt=''
					className={`w-40 h-40 rounded-xl ${detail ? '' : ''}`}
				/>
				<p className='text-xl font-medium justify-self-center'>
					{product.title}
				</p>
			</div>
			<div
				className={`${
					detail ? '' : 'hidden'
				} flex gap-10 justify-around items-center `}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className={`items-center gap-6 grid place-content-between`}
				>
					<div
						className='relative'
						onMouseMove={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						<div
							className={`${
								hover ? 'opacity-100' : 'opacity-0 -z-10'
							} absolute min-w-full z-10 min-h-full flex duration-200 justify-center items-center bg-[rgba(255,255,255,0.5)] rounded-xl`}
						>
							<img
								src='/Extend.png'
								alt=''
								className='w-20 cursor-pointer opacity-80 hover:scale-105 duration-200 active:scale-100'
								onClick={() => {
									setModal(true)
									setImages(product.image)
								}}
							/>
						</div>
						<img
							src={product.image}
							alt=''
							className={`w-40 h-40 rounded-xl ${detail ? '' : ''}`}
						/>
					</div>
					<p className='text-xl font-medium justify-self-center'>
						{product.title}
					</p>
				</div>
				<div className='flex flex-col gap-2 justify-start font-medium text-xl'>
					<p className='align-text-top'>
						<span className='text-base font-light'>артикул :</span>
						<br />
						{product.art_number}
					</p>
					<p className='align-text-top'>
						<span className='text-base font-light'>размеры :</span>
						<br />
						{product.desc}
					</p>
					<p className='align-text-top'>
						<span className='text-base font-light'>материал :</span>
						<br />
						{product.category}
					</p>
					{/* <p>{product.season}</p> */}
					<div className='pt-8'>
						<button
							onClick={(e) => {
								e.stopPropagation()
								setProductKey(id)
								setDel(true)
							}}
							className='py-1 px-3 hover:-translate-y-[1px] hover:shadow-md hover:shadow-[#c5c5c5] duration-200 active:translate-y-[0] active:shadow-none active:bg-red-800 bg-red-500 text-white rounded-md'
						>
							Удалить
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product
