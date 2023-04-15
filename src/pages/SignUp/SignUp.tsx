import "./SignUp.css";
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
import { UserAuth } from "../../context/AuthContext";
import { useHistory } from "react-router";
import Toast from "../../components/Toast/Toast";

const SignUp: React.FC<any> = () => {
  const history = useHistory();
  const { createUser } = UserAuth();
  const { presentToast } = Toast();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const signUpHandler = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      await createUser(userInput.email, userInput.password);
      setLoading(false);
      setUserInput({
        email: "",
        password: "",
      });

      history.push("/");
      presentToast("account created", 1500, "bottom");
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  const onChangeHandler = (e: any) => {
    const name = e.target.name;

    setUserInput((prevValue: any) => {
      return {
        ...prevValue,
        [name]: e.target.value,
      };
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              style={{ display: "block" }}
              color="light"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>SIGN UP</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={loading}
          // onDidDismiss={ ()=> state.auth && alert("account created successfully")}
          message={"creating..."}
        />
        <main>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">SignUp page</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonTitle slot="start">Create an Account</IonTitle>

          <form onSubmit={signUpHandler} className="signin-form">
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

            <IonButton id="sign-up" type="submit" expand="block">
              create account
            </IonButton>
          </form>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
