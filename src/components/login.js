import { GoogleLogin } from 'react-google-login'

const clientId = "480801324706-b4fjshrfrfom25j91fo4edl1aomkepsk.apps.googleusercontent.com"

function Login() {
    
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESFUL! Current user: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }
    
    
    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;