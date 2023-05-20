import React from 'react'
import  ReactDOM  from 'react-dom/client'
import Header from './components/header'
import Body from './components/body'
import '@fortawesome/fontawesome-free/css/all.min.css';



const AppLayout =  ()=>{
    return (
            <>
            <Header/>
            <Body/>
            </>
        )
}

const Root = ReactDOM.createRoot(document.getElementById('root')) ;
Root.render(<AppLayout/>)