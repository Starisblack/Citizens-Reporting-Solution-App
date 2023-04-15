import "./ForgotPassword.css";
import {
  IonButtons,
  IonContent,
  IonLoading,
  useIonAlert,
  IonHeader,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { UserAuth } from "../../context/AuthContext";
import { useState } from "react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [presentAlert] = useIonAlert();

  const { resetPassword } = UserAuth();

  const resetHandler = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      await resetPassword(email);
      presentAlert({
        header: "Password Reset",
        subHeader: "",
        message: "Check your email inbox to reset your password",
        buttons: ["OK"],
      });
      setLoading(false);
      setEmail("");
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
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
          <IonTitle>Forgot Password</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        message={"please wait..."}
      />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Forgot Password</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="forgot-container  text-start">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="mb-4">
                    <h5>Forgot Password?</h5>
                    <p className="mb-2 p-0">
                      Enter your registered email to reset the password
                    </p>
                  </div>
                  <form>
                    <div className="mb-3">
                      <input
                        type="email"
                        id="email"
                        onChange={(e: any) => {
                          setEmail(e.target.value);
                        }}
                        className="form-control"
                        name="email"
                        placeholder="Enter Your Email"
                        value={email}
                        required
                      />
                    </div>
                    <div className="mb-3 d-grid">
                      <button
                        onClick={resetHandler}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
