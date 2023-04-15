import "./Profile.css";
import { useState } from "react";
import { useHistory } from "react-router";
import {
  IonButtons,
  IonLoading,
  useIonAlert,
  IonContent,
  IonHeader,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ProfileCard from "./ProfileCard";
import { UserAuth } from "../../context/AuthContext";
import { deleteUser } from "firebase/auth";
import Toast from "../../components/Toast/Toast";

const Profile: React.FC<any> = () => {
  const { presentToast } = Toast();
  const [presentAlert] = useIonAlert();
  const { user } = UserAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const deleteAccount = async () => {
    await deleteUser(user)
      .then(() => {
        setLoading(false);
        history.push("/");
        presentToast("Account Deleted", 1500, "middle");
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  const deleteHandler = (selected: any) => {
    presentAlert({
      header: "Delete Account",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Yes",
          role: "confirm",
          handler: () => {
            setLoading(true);
            deleteAccount();
          },
        },
      ],
      onDidDismiss: () => {},
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
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        message={"deleting..."}
      />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ProfileCard click={deleteHandler} user={user} />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
