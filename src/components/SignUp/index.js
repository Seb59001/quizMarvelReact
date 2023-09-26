import react, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import FirebaseContext from '../FirebaseBundle/context'


const Signup = (props) => {

  const firebase = useContext(FirebaseContext);

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [loginData, setLoginData] = useState(data);
  const[error, setError] = useState('');

  const handleChange = e => {
    setLoginData({...loginData, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    firebase.signupUser(email, password)
    .then(authUser => {
      return firebase.user(authUser.user.uid).set({
        pseudo: pseudo,
        email: email
      })
    })
    .then(() => {
      setLoginData({...data});
      props.history.push('/welcome')
    })
    .catch(error => {
      setError(error);
      setLoginData({...data});
    })
  }

  const {pseudo, email, password, confirmPassword} = loginData;

  const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword ? <button disabled >Inscription</button> : <button className='signupBtn' >Inscription</button>

  //gestion erreurs

  const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className="SignUpLoginBox">
        <div className="slContainer">
            <div className="formBoxLeftSignup">

            </div>
            <div className="formBoxRight">
              <div className="formContent">
                <form onSubmit={handleSubmit}>
                {errorMsg}
                  <h2>Inscription</h2>
                  <div className="inputBox">

                    <input value={pseudo} onChange={handleChange} type="text" id="pseudo" autoComplete="off" required/>
                    <label htmlFor="pseudo">Pseudo</label>
                  </div>

                  <div className="inputBox">

                    <input value={email} onChange={handleChange} type="email" id="email" autoComplete="off" required/>
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="inputBox">
                    <input value={password} onChange={handleChange} type="password" id="password" autoComplete="off" required/>
                    <label htmlFor="password">Mot de passe</label>
                  </div>

                  <div className="inputBox">
                    <input value={confirmPassword} onChange={handleChange} type="password" id="confirmPassword" autoComplete="off" required/>
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                  </div>
                  {btn}
                </form>
                <div className='linkContainer'>
                  <Link to="/login" className="simpleLink">Déjà inscrit ? Connectez-vous</Link>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
export default Signup