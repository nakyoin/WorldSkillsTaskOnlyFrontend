import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'


const Index = ({ isAuth, setIsAuth, token, setToken, products, setProducts}) => {

    const[loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            await fetch(
                "http://127.0.0.1:8000/11/api-cart/products/"
            )
                .then((res) => res.json())
                .then((json) => {
                    setProducts(json.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        fetchProducts();
    }, [])



    const addToCart = (item, index) => {
        fetch(`http://127.0.0.1:8000/11/api-cart/cart/${index}`, {
            method:'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    };

    const productCard = products.map((product, index) => {
        return(
            <div className='col' key={product.id}>
                <div className='card mb-4 rounded-3 shadow-sm'>
                    <div className='card-header py-3'>
                        <h4 className='my-0 fw-normal'>{product.name}</h4>
                    </div>
                    <div className='card-body'>
                        <h1 className='card-title pricing-card-title'>{product.price}</h1>
                        <p>{product.description}</p>
                        {isAuth ? <button type='button'
                        className='w-100 btn btn-lg btn-outline-primary' 
                        onClick={() => addToCart(product, product.id)}>
                            Добавить в корзину
                        </button> : ''}
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
                    <h1 className='display-4 fw-normal'>Каталог товаров</h1>
                </div>
            </header>
            <main>
                <div className='row row-cols-1 row-cols-md-3 mb-3 text-center'>
                    {productCard}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Index;