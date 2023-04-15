import "./ProfileCard.css";
import { IonButton } from "@ionic/react";
import avatar from "../../assets/images/avatar.png";

const ProfileCard: React.FC<any> = (props: any) => {
  let profileDetail = <p>Loading....</p>;

  if (props.user) {
    profileDetail = (
      <div className="text-center card-box">
        <div className="member-card pt-2 pb-2">
          <div className="thumb-lg member-thumb mx-auto">
            <img
              src={avatar}
              className="rounded-circle img-thumbnail"
              alt="Anonymous User at notify"
            />
          </div>
          <div className="">
            <h4>Anonymous User</h4>
            <p className="text-muted">{props.user.email}</p>
          </div>

          <div className="container">
            <IonButton onClick={props.click} color="danger">
              Delete Account
            </IonButton>
          </div>
        </div>
      </div>
    );
  }

  return profileDetail;
};

export default ProfileCard;
