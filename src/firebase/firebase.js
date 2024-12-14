import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyDri_qiVEOfUxeRmnQiTF7lyPAigyun7bo',
	authDomain: 'nft-profect.firebaseapp.com',
	databaseURL: 'https://nft-profect-default-rtdb.firebaseio.com/',
	projectId: 'nft-profect',
	storageBucket: 'nft-profect.appspot.com',
	messagingSenderId: '430449212982',
	appId: '1:430449212982:web:16931b86676a92b07ba297',
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const storage = getStorage(app)
export const refDb = ref
