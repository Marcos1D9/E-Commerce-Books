import { useDispatch } from 'react-redux'
import { setToAdminData, getUsers } from '../../../actions'
import styles from '../../../Styles/Button.module.css'
export default function AdminDataSet(props) {
  const dispatch = useDispatch()

  const users = props.users
  const setChanged = props.setChanged
  const changed = props.changed
  //console.log("changed es: ", changed);
  var userIds = []

  function toogleAdmin(e, users) {
    users.forEach((usuario) => {
      userIds.push(usuario._id)
    })
    dispatch(setToAdminData(userIds))
    setTimeout(function () {
      dispatch(getUsers())
    }, 500)
    setChanged(!changed)
    // console.log("changed AHORA ES es: ", changed);
    userIds = []
  }

  return (
    <button className={styles.button} onClick={(e) => toogleAdmin(e, users)}>
      Data
    </button>
  )
}