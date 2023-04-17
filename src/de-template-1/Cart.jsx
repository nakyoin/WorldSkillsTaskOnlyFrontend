import React, {useState, useEffect} from 'react';
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const Cart = ({ isAuth, setIsAuth, token, setToken }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLodaing] = useState(false);

    const navigate = useNavigate();

    const fetchCart = async () => {
        setLodaing(true);
        await fetch(
           "http://127.0.0.1:8000/11/api-cart/cart/", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
          }
        )
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    setCart(json[0].products)
                }

            })
            .finally(() => {
                setLodaing(false);
            });
        }
        useEffect(() => {
            fetchCart();
    }, [])

    const makeOrder = (item, index) => {
        fetch(`http://127.0.0.1:8000/11/api-cart/order/`, {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        fetchCart()
        navigate('/orders')
    };

    const cartBlock = cart.map(c => {
        return(
            <div className='col' key={c.id}>
                <div className='card mb-4 rounded-3 shadow-sm'>
                    <div className='card-header py-3'>
                        <h4 className='my-0 fw-normal'>{c.name}</h4>
                    </div>
                    <div className='card-body'>
                        <h1 className='card-title pricing-card-title'>{c.price}p.<small className='text-muted fw-light'>&times; 2шт.</small></h1>
                        <p>{c.description}</p>
                        <button type='button' className='btn btn-lg btn-info mb-3'>+</button>
                        <button type='button' className='btn btn-lg btn-warning mb-3'>-</button>
                    </div>
                </div>
            </div>
        )
    })
    return(
        <div className='container py-3'>
            <header>
                <Header isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} />
                <div className='pricing-header p-3 pb-md-4 mx-auto text-center'>
                    <h1 className='display-4 fw-normal'>Корзина</h1>
                </div>
            </header>
            <main>
                <div className='row row-cols-1 row-cols-md-3 mb-3 text-center'>
                    {cartBlock}
                </div>
                <div className='row justify-content-center gap-1'>
                    <h2 className='mb-5'>Итоговая стоимость: 600р.</h2>
                    <button className='col-6 btn btn-lg btn-outline-info mb-3' onClick={() => navigate('/')}>Назад</button>
                    <button className='col-6 btn btn-lg btn-primary mb-3' onClick={() => makeOrder()}>Оформить заказ</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Cart;