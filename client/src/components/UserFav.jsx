import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, deleteBookFav, getUsers, purchaseOrder, updateAmount } from '../actions'
import style from '../Styles/userFav.module.css'

const UserFav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const allUsers = useSelector((state) => state.users)
  const users = useSelector((state) => state.userLogged)
  const products = useSelector(state => state.cart)
  const productsAmount=useSelector((state)=>state.cartAmount)
  const userId = allUsers.filter((u) => u._id === users[0]._id)

  const handleDeleteFav = (book) => {
    const id = users[0]._id
    dispatch(deleteBookFav(book, id))
    alert('Libro Favorito Eliminado')
    navigate('/user')
    dispatch(getUsers())
  }

  function handleAddToCart(e) {
    e.preventDefault()
    if (users.length === 0) return loginWithRedirect()
    dispatch(addToCart(e.target.value))
    dispatch(updateAmount(productsAmount+1))
    alert('Libro agregado al carrito!')
    setTimeout(function(){
      
      dispatch(purchaseOrder({
        email: users[0].email, 
        name: users[0].name,
        title: products[products.length-1].title,
        unit_price: products[products.length-1].price, 
        quantity: products[products.length-1].amount,
      }))
       
    }, 200)
  }

  return (
    <div className={style.containerFavouritesBooks}>
      <h1 className={style.titleFavouritesBooks}>Mis libros favoritos:</h1>

      <ol className={style.containerGridBooks}>
        {userId[0].favouritesBooks?.map((e) => (
          <li className={style.itemBook}>
            <p className={style.titleBook}>{e.title}</p>
            <Link to={'/book/' + e._id}>
              <img className={style.imgBook} src={e.cover} alt='buscando' />
            </Link>
            {
              e.stock > 1 ?
              <button value={e._id} onClick={(e) => handleAddToCart(e)}>
                Añadir al carrito
              </button> : ''
            }
            <button
              className={style.button}
              onClick={() => handleDeleteFav(e._id)}
            >
              X
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default UserFav
