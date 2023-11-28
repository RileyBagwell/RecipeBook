import { GoogleLogin, GoogleLogout } from 'react-google-login'

const clientId = "480801324706-b4fjshrfrfom25j91fo4edl1aomkepsk.apps.googleusercontent.com"

function Logout() {
    
    const onSuccess = () => {
        console.log("Logout succesful ");
        window.location='/';
    }
    
    return(
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;