import flowbite from 'flowbite-react/tailwind'
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}', flowbite.content()],
	theme: {
		extend: {
			colors: {
				'my-cyan': '#38727F',
				'my-dark-cyan': '#1E6271',
			},
		},
	},
	plugins: [flowbite.content()],
}
