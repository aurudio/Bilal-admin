import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: 'https://nft-profect-default-rtdb.firebaseio.com/',
	projectId: process.env.PROJECT_ID,
	storageBucket: 'nft-profect.appspot.com',
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const storage = getStorage(app)
export const refDb = ref
