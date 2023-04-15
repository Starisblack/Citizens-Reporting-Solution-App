import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  IonButtons,
  IonCol,
  IonLoading,
  IonGrid,
  IonRow,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import Toast from "../../components/Toast/Toast";
import { UserAuth } from "../../context/AuthContext";
import Card from "../../components/Card/Card";
import { add } from "ionicons/icons";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import db from "../../firebase-config";
import ExploreContainer from "../../components/ExploreContainer";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchIncidentLists, setFetchIncidentLists] = useState<any>([]);
  const [filterParam, setFilterParam] = useState<string>("");
  const { user } = UserAuth();

  const { presentToast } = Toast();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    const q = query(collection(db, "incidents"), orderBy("created", "desc"));

    onSnapshot(q, (querySnapshot) => {
      setFetchIncidentLists(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );

      setLoading(false);
    });
  }, []);

  const filterHandler = (e: any) => {
    setFilterParam(e.target.value);
  };

  const filterIncident = (incidents: any) => {
    if (filterParam === "") {
      return incidents;
    } else if (filterParam === "All") {
      return incidents;
    } else {
      return incidents.filter(
        (incident: any) => incident.data.category === filterParam
      );
    }
  };

  const onClickHandler = () => {
    if (!user) {
      presentToast("sign in to create incident", 1500, "middle");
    } else {
      history.push("/create");
    }
  };

  let loadingIncidents = null;

  if (fetchIncidentLists.length >= 1) {
    loadingIncidents = filterIncident(fetchIncidentLists).map(
      (incident: any) => {
        return (
          <Card
            key={incident.id}
            id={incident.id}
            postImg={incident.data.incidentImg}
            category={incident.data.category}
            title={incident.data.description}
            location={incident.data.location}
          />
        );
      }
    );
  } else {
    loadingIncidents = (
      <ExploreContainer name="No incident as been reported yet" />
    );
  }

  return (
    <IonPage className="home">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>NotifyMe</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={loading}
          // onDidDismiss={ ()=> state.auth && alert("account created successfully")}
          message={"Loading..."}
        />

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid className="px-3">
          <IonRow className="d-flex align-items-center">
            <IonCol>
              <IonTitle className="px-0">Latest Incidents</IonTitle>
            </IonCol>

            <IonCol className="d-flex justify-content-end my-3">
              <IonList>
                <IonItem>
                  <IonSelect
                    onIonChange={filterHandler}
                    interface="popover"
                    placeholder="Filter by"
                  >
                    <IonSelectOption value="All">All</IonSelectOption>
                    <IonSelectOption value="Accident">Accident</IonSelectOption>
                    <IonSelectOption value="Fire">Fire Hazard</IonSelectOption>
                    <IonSelectOption value="Security">Security</IonSelectOption>
                    <IonSelectOption value="Riot">Riot</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="px-3">{loadingIncidents}</div>
      </IonContent>
      <IonFab
        onClick={onClickHandler}
        slot="fixed"
        vertical="bottom"
        horizontal="end"
      >
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Home;
