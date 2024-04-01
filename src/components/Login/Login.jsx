import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../Firebase/firebase.init";
import { useState } from "react";


const Login = () => {

    const [user, setUser] = useState(null)

    const auth = getAuth(app)
    // console.log(app)
    const provider = new GoogleAuthProvider()


    const handleGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const logInUser = result.user;
                console.log(logInUser)
                setUser(logInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }


    const handleSignOut =()=>{
        signOut(auth)
        .then( result =>{
            console.log(result)
            setUser(null)
        })
        .catch(error =>{
            console.log(error)
        })
    }



    return (
        <div>
          {
            user 
            ?  
            <button onClick={handleSignOut}>signOut</button>
            :
            <button onClick={handleGoogleSignin}>Google login</button>
          }

            {user && <div>
                <p>{user.displayName}</p>
                <p>User: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;