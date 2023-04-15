import { RouteComponentProps, useHistory } from "react-router";
import "./SinglePageIncident.css";
import {
  IonPage,
  IonImg,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase-config";
import DeleteIncident from "../Incident/DeleteIncident/DeleteIncident";
import Spinner from "../../components/Spinner/Spinner";
import { UserAuth } from "../../context/AuthContext";

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const SinglePageIncident: React.FC<UserDetailPageProps> = (props) => {
  let history = useHistory();

  const id = props.match.params.id;

  console.log(id);

  const { user } = UserAuth();

  console.log(user);

  const [incidentData, setIncidentData] = useState<any>();

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, "incidents", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let incidentFetch = docSnap.data();
        setIncidentData(incidentFetch);
      } else {
        alert("No such document!");
        history.push("/");
      }
    };

    getDocument();
  }, [history, id]);

  let singleIncident = <Spinner />;
  let showDeleteButton = null;
  if (incidentData) {
    singleIncident = (
      <div className="indicent-detail-box">
        <IonImg
          src={
            incidentData.incidentImg
              ? incidentData.incidentImg
              : "https://ionicframework.com/docs/img/demos/card-media.png"
          }
          alt={incidentData.description}
        ></IonImg>
        <div className="incident-details">
          <h1>{incidentData.category + " Report"}</h1>
          <p>
            {" "}
            <span>Description: </span> {incidentData.description}{" "}
          </p>
          <p>
            <span>Location:</span> {incidentData.location}
          </p>
          <p>
            <span>Date: </span> {incidentData.date}
          </p>
          <p>
            <span>Time: </span> {incidentData.time}
          </p>
        </div>
      </div>
    );

    if (user === null) {
      showDeleteButton = null;
    } else if (user.uid === incidentData.createdBy) {
      showDeleteButton = (
        <DeleteIncident id={id} imgRef={incidentData.imgRef} />
      );
    }
  }

  return (
    <IonPage className="singlePostPage">
      <IonHeader collapse="fade" className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="primary"></IonBackButton>
          </IonButtons>

          <div className="del-edit-box">{showDeleteButton}</div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{singleIncident}</IonContent>
    </IonPage>
  );
};

export default SinglePageIncident;
