import "./Entries.css";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import { UserAuth } from "../../context/AuthContext";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useState } from "react";

const Entries: React.FC = () => {
  const { incidentLists, user } = UserAuth();

  const [userEntries, setUserEntries] = useState<[] | any>([]);

  useEffect(() => {
    setUserEntries(
      incidentLists.filter(
        (incident: any) => incident.data.createdBy === user.uid
      )
    );
  }, [incidentLists, user.uid]);

  let yourEntries = <Spinner />;

  if (userEntries.length >= 1) {
    yourEntries = userEntries.map((item: any) => {
      return (
        <Card
          key={item.id}
          id={item.id}
          postImg={item.data.incidentImg}
          category={item.data.category}
          title={item.data.description}
          location={item.data.location}
        />
      );
    });
  } else if (userEntries.length === 0) {
    yourEntries = <ExploreContainer name="You have no entry" />;
  }

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
          <IonTitle>Entries</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Entries</IonTitle>
          </IonToolbar>
        </IonHeader>
        <main>
          <h1 className="my-4 text-center">Your Entries</h1>

          {yourEntries}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Entries;
