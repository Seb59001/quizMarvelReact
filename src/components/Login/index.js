import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../FirebaseBundle/context'



const Login = (props) => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');
  const [customError, setCustomError] = useState('');

  useEffect(() => {
    if (password.length > 5 && email !== '') {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .loginuser(email, password)
      .then(user => {
        console.log(user);
        setEmail('');
        setPassword('');
        props.history.push('/welcome');
      })
      .catch(error => {
        // Personnalisez le message d'erreur en fonction du code d'erreur Firebase
        switch (error.code) {
          case 'INVALID_LOGIN_CREDENTIALS':
            setCustomError('Identifiants de connexion invalides. Veuillez réessayer.');
            break;
          default:
            setCustomError('Le mot de passe et ou l\'identifiant sont invalides.');
            break;
        }
        setError(error);
        setEmail('');
        setPassword('');
      });
  }

  const errorMsg = customError !== '' && <span>{customError}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin">

        </div>
        <div className="formBoxRight">
          <div className="formContent">

            {errorMsg}

            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>


              

              <div className="inputBox">

                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="off" required />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}

            </form>
            <div className='linkContainer'>
              <Link to="/signup" className="simpleLink">Nouveau sur marvel Quiz ? Inscrivez-vous maintenant. </Link> <br />
              <Link to="/forgetpassword" className="simpleLink">Mot de passe oublié ? Récupérez le ici </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login