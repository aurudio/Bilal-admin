import { useState } from 'react'
import AddProduct from './components/AddProduct'
import ProductList from './components/ProductList'

function App() {
	const [view, setView] = useState('list')

	return (
		<div className='App'>
			<div className='flex justify-between px-16 py-7'>
				<img src='/logo.png' alt='Logo' width={50} />
				<div className='flex gap-8'>
					<button
						disabled={view === 'list' ? true : false}
						className={`py-2 px-10 text-white font-bold  rounded-full ${
							view === 'list'
								? 'bg-my-dark-cyan'
								: 'bg-my-cyan hover:-translate-y-[1px] hover:shadow-md hover:shadow-[#828282] duration-200 active:translate-y-[0] active:shadow-none active:bg-my-dark-cyan'
						}
						
						`}
						onClick={() => setView('list')}
					>
						Список
					</button>
					<button
						disabled={view === 'add' ? true : false}
						className={`py-2 px-10 text-white font-bold  rounded-full ${
							view === 'add'
								? 'bg-my-dark-cyan'
								: 'bg-my-cyan hover:-translate-y-[1px] hover:shadow-md hover:shadow-[#828282] duration-200 active:translate-y-[0] active:shadow-none active:bg-my-dark-cyan'
						}
						
						`}
						onClick={() => setView('add')}
					>
						Добавление
					</button>
				</div>
			</div>
			{view === 'list' ? <ProductList /> : <AddProduct />}
		</div>
	)
}

export default App
