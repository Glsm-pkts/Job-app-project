import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.scss'
import store from './redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store = {store}>
    <App />
    <ToastContainer />
    </Provider>
    

)
