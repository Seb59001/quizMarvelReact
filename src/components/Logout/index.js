import {useState, useEffect, useContext} from 'react'
import FirebaseContext from '../FirebaseBundle/context'
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Logout = (props) => {

    const firebase = useContext(FirebaseContext)

    const [checked, setchecked] = useState(false);

    useEffect(() => {
      if(checked) {
        console.log("Déconnexion")
        firebase.signoutUser();
      }

    }, [checked, firebase]);

    const handleChange = (e) => {
        setchecked(e.target.checked)
    }
    

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input 
                onChange={handleChange}
                type="checkbox" 
                checked={checked}/>
                <span className="slider round" data-tooltip-id="my-tooltip" data-tooltip-content="Déconnexion"></span>
            </label>
            <Tooltip id="my-tooltip" place="left" effect="solid"/>
        </div>
    )
}
export default Logout