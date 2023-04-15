import { useState } from "react";
import { useIonAlert, IonIcon, IonLoading } from "@ionic/react";
import { trash } from "ionicons/icons";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import "./DeleteIncident.css";
import db, { storage } from "../../../firebase-config";
import { useHistory } from "react-router";

function DeleteIncident(props: any) {
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const [presentAlert] = useIonAlert();

  const desertRef = ref(storage, "images/" + props.imgRef);

  const handleDelete = () => {
    const deletePost = async () => {
      const postDocRef = doc(db, "incidents", props.id);
      try {
        await deleteDoc(postDocRef);
        await deleteObject(desertRef)
          .then(() => {
            console.log("File deleted successfully");
          })
          .catch((error) => {
            console.log(" Uh-oh, an error occurred!");
          });

        setLoading(false);
        history.push("/");
      } catch (err) {
        alert(err);
      }
    };

    presentAlert({
      header: "delete the post?",
      cssClass: "custom-alert",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            setLoading(true);
            deletePost();
          },
        },
      ],
    });
  };
  return (
    <div onClick={handleDelete} className="del-container">
      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        message={"deleting..."}
      />
      <IonIcon slot="end" icon={trash} color="danger"></IonIcon>
      <p style={{ margin: "0" }}>Delete</p>
    </div>
  );
}
export default DeleteIncident;
