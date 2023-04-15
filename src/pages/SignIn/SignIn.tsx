import "./SignIn.css";
import { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonItem,
  IonLoading,
  IonInput,
  IonLabel,
  IonContent,
  IonHeader,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import { AppContext } from "../../State/State";
import { Link, useHistory } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../../firebase-config";
import Toast from "../../components/Toast/Toast";

const SignIn: React.FC = () => {
  const history = useHistory();

  const { signInUser } = UserAuth();

  const { presentToast } = Toast();

  //  const {state, dispatch} = useContext(AppContext)

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });

  const signInHandler = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInUser(user.email, user.password);
      setLoading(false);
      setUser((prevValue: any) => {
        return { ...prevValue, email: "", password: "" };
      });
      history.push("/");
      presentToast("login successfully", 1500, "bottom");
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  const onChangeHandler = (e: any) => {
    const name = e.target.name;

    setUser((prevValue: any) => {
      return {
        ...prevValue,
        [name]: e.target.value,
      };
    });
  };

  return (
    <IonPage className="sigIn-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              style={{ display: "block" }}
              color="light"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>SIGN IN</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={loading}
          message={"signing..."}
        />
        <main>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">sign in page</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonTitle slot="start">Login to Your Account</IonTitle>

          <form onSubmit={signInHandler} className="signin-form">
            <IonItem fill="outline">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                placeholder="Email"
                name="email"
                onIonChange={onChangeHandler}
                required
              ></IonInput>
            </IonItem>

            <IonItem fill="outline">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                placeholder="Password"
                name="password"
                onIonChange={onChangeHandler}
                required
              ></IonInput>
            </IonItem>
            <div className="text-end mb-4">
              <Link
                to="/forgot-password"
                id="forgot-pass-btn"
                className="link"
                slot="end"
              >
                Forgot Password
              </Link>
            </div>

            <IonButton id="login" type="submit" expand="block">
              Login
            </IonButton>

            <div className="sign-up-container">
              <p className="my-0">Not registered yet?</p>
              <Link id="signUp" to="/sign-up" className="link">
                Create an Account
              </Link>
            </div>
          </form>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
