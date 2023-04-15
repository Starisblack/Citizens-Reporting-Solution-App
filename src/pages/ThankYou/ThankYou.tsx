import "./ThankYou.css";
import { IonIcon, IonPage, IonButton } from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";

const ThankYou: React.FC = () => {
  return (
    <IonPage className="thank-you-page">
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div>
          <div className="mb-4 text-center">
            <IonIcon icon={checkmarkCircleOutline} color="primary"></IonIcon>
          </div>
          <div className="text-center">
            <h1>Thank You !</h1>
            <p>YOU DID A GREAT A JOB</p>

            <Link to="/">
              <IonButton>Back Home</IonButton>
            </Link>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default ThankYou;
