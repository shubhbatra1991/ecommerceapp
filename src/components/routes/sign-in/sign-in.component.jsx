import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
    auth
  } from '../../../utils/firebase/firebase.utils.js';
import SignUpForm from '../../sign-up/sign-up-form.component.jsx';

  
  const SignIn = () => {
    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    };

  
    return (
      <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        <SignUpForm />
        
        <button> Sign out button </button>
      </div>
    );
  };
  
  export default SignIn;