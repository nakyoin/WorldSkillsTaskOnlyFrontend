import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({isAuth, setIsAuth, setToken}) => {
    return (
        <div className='d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom'>
            <Link to='/' className='d-flex align-items-center text-dark text-decoration-none'>
                <span className='fs-4'>"Just Buy"</span>
            </Link>
            <nav className='d-inline-flex mt-2 mt-md-0 ms-md-auto'>
                {isAuth === false ? (
                    <>
                        <Link className='me-3 py-2 text-dark text-decoration-none' to='/register'>Регистрация</Link>
                        <Link className='me-3 py-2 text-dark text-decoration-none' to='/login'>Авторизация</Link>
                    </>
                ) : (
                    <>
                        <Link className='me-3 py-2 text-dark text-decoration-none' to='/orders'>Заказы</Link>
                        <Link className='me-3 py-2 text-dark text-decoration-none' to='/cart'>Корзина</Link>
                        <Link className='me-3 py-2 text-dark text-decoration-none' to='/' 
                        onCLick={() => { setIsAuth(false); setToken('')}} >
                            Выйти
                        </Link>
                    </>
                )}
            </nav>
        </div>
    )
}

export default Header;