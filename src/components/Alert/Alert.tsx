import { useIonAlert } from "@ionic/react";
import { useHistory } from "react-router";
import Toast from "../Toast/Toast";

function Alert() {
  const [presentAlert] = useIonAlert();
  const { presentToast } = Toast();

  const history = useHistory();

  const alert = (action: any, route: any) => {
    presentAlert({
      header: "Do you want to sign out?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Yes",
          role: "confirm",
          handler: async () => {
            await action();
            presentToast("Logged Out", 1500, "bottom");
            history.push(route);
          },
        },
      ],
      onDidDismiss: () => {},
    });
  };

  return { alert };
}
export default Alert;
