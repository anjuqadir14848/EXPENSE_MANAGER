import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAeL5wGpc0Gua9gXe0kIO2aaL6Z09XT64c",
  authDomain: "expenses-aea2b.firebaseapp.com",
  databaseURL: "https://expenses-aea2b-default-rtdb.firebaseio.com",
  projectId: "expenses-aea2b",
  storageBucket: "expenses-aea2b.firebasestorage.app",
  messagingSenderId: "1005606553701",
  appId: "1:1005606553701:web:9858e53760b2cc18d6de8c",
  measurementId: "G-32FPVSKJHK"
};

const app = initializeApp(firebaseConfig);
const db= getDatabase(app);
export { db }; 
