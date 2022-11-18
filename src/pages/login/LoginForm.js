import React, { useCallback, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
} from 'devextreme-react/form';
import { signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

import './LoginForm.scss';

export default function LoginForm() {

  const logGoogleUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    const userDocRef = await createUserDocumentFromAuth(user);
  }
  const navigate = useNavigate();


  const onCreateAccountClick = useCallback(() => {
    navigate('/create-account');
  }, [navigate]);

  const googleButtonOptions = {
    onClick: logGoogleUser,
    text: 'Google Sign In',
    width:'100%',
    type: 'default',
  }

  return (
    <form className={'login-form'} onSubmit={logGoogleUser}>
      <Form>
        
      <Item itemType="button" buttonOptions={googleButtonOptions} />
        <Item>
          <div className={'link'}>
            <Link to={'/reset-password'}>Forgot password?</Link>
          </div>
        </Item>
        <ButtonItem>
          <ButtonOptions
            text={'Create an account'}
            width={'100%'}
            onClick={onCreateAccountClick}
          />
        </ButtonItem>
      </Form>
    </form>
  );
}

