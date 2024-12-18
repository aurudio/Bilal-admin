import React from 'react'

import { useLocation, useNavigate } from 'react-router'

const Navbar = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	return (
		<div className='flex justify-between px-16 py-7'>
			<img
				src='/logo.png'
				alt='Logo'
				width={50}
				onClick={() => navigate('/')}
			/>
			<div className='flex gap-8'>
				<button
					disabled={pathname === '/' ? true : false}
					className={`py-2 px-10 text-white font-bold  rounded-full ${
						pathname === '/'
							? 'bg-my-dark-cyan'
							: 'bg-my-cyan hover:-translate-y-[1px] hover:shadow-md hover:shadow-[#828282] duration-200 active:translate-y-[0] active:shadow-none active:bg-my-dark-cyan'
					}
						
						`}
					onClick={() => navigate('/')}
				>
					Список
				</button>
				<button
					disabled={pathname === '/add' ? true : false}
					className={`py-2 px-10 text-white font-bold  rounded-full ${
						pathname === '/add'
							? 'bg-my-dark-cyan'
							: 'bg-my-cyan hover:-translate-y-[1px] hover:shadow-md hover:shadow-[#828282] duration-200 active:translate-y-[0] active:shadow-none active:bg-my-dark-cyan'
					}
						
						`}
					onClick={() => navigate('/add')}
				>
					Добавление
				</button>
			</div>
		</div>
	)
}

export default Navbar
