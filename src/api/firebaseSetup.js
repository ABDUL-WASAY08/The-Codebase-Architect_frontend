import {getAuth, GithubAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_APIKEY,
  authDomain: "codebasearchetecture.firebaseapp.com",
  projectId: "codebasearchetecture",
  storageBucket: "codebasearchetecture.firebasestorage.app",
  messagingSenderId: "1003257739324",
  appId: "1:1003257739324:web:34b0cf73011689218e6b39",
  measurementId: "G-K5QQDEQKSK"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const provider=new GithubAuthProvider()
provider.addScope('repo');
provider.addScope('read:user');
export {auth,provider}