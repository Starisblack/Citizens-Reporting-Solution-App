import React from "react";
import { Link } from "react-router-dom";
import {
  IonCol,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "./Card.css";
import { locationOutline } from "ionicons/icons";
import Spinner from "../Spinner/Spinner";

function Card(props: any) {
  // let postImg = <Spinner />

  // if (props.postImg){

  //    postImg = props.postImg
  // }

  return (
    <div className="card my-4">
      <Link className="read-more-btn" to={"/incident/" + props.id}>
        <IonCard>
          <IonGrid>
            <IonRow style={{ alignItems: "center" }}>
              <IonCol size="4.5" className="p-0">
                {props.postImg ? (
                  <img alt="Silhouette of mountains" src={props.postImg} />
                ) : (
                  <Spinner />
                )}
              </IonCol>

              <IonCol size="7.5">
                <IonCardHeader>
                  <IonCardSubtitle>{props.category}</IonCardSubtitle>
                  <IonCardTitle className="mt-2">
                    {props.title.slice(0, 40) + "..."}
                  </IonCardTitle>
                </IonCardHeader>

                <p>
                  <IonIcon icon={locationOutline}></IonIcon>
                  {props.location}
                </p>
                <IonButton className="read-more-btn" fill="clear">
                  read more
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </Link>
    </div>
  );
}
export default Card;
