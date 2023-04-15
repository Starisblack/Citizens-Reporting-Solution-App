import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase-config";
import { UserAuth } from "../../context/AuthContext";
// import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import axios from "axios";

const IncidentActions = () => {
  const { user } = UserAuth();

  const createIncident = (incidentData: object) => {
    return addDoc(collection(db, "incidents"), {
      ...incidentData,
      createdBy: user.uid,
    });
  };

  const sendNotification = async (title: string, description: string) => {
    //    const serverKey = "AAAAcxLmLo0:APA91bEZIoIlSeQdRnw5Z-lEhB0wIb_1OVVNNlJVWik_D91UMs5XsdCN0jW7JfJcFEtkjHCyo9s2fe6XQOCeA5vm9JbFSr1iYt-Y0VWc0a6KHGuX6EOLavPaPjmc3CXxLX4tE1dDkZVA"

    const formData = {
      to: "/topics/news",
      notification: {
        title: title,
        body: description,
      },
    };

    //   const options = {
    //     url: "https://fcm.googleapis.com/fcm/send",
    //     headers: {
    //         "Authorization": "key=AAAAcxLmLo0:APA91bEZIoIlSeQdRnw5Z-lEhB0wIb_1OVVNNlJVWik_D91UMs5XsdCN0jW7JfJcFEtkjHCyo9s2fe6XQOCeA5vm9JbFSr1iYt-Y0VWc0a6KHGuX6EOLavPaPjmc3CXxLX4tE1dDkZVA",
    //        " Content-Type": "application/json"
    //     },
    //     data: formData,
    //   };

    //   const response: HttpResponse = await CapacitorHttp.post(options);

    //   console.log(response);

    const { data } = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      formData,
      {
        headers: {
          Authorization:
            "key=AAAAcxLmLo0:APA91bEZIoIlSeQdRnw5Z-lEhB0wIb_1OVVNNlJVWik_D91UMs5XsdCN0jW7JfJcFEtkjHCyo9s2fe6XQOCeA5vm9JbFSr1iYt-Y0VWc0a6KHGuX6EOLavPaPjmc3CXxLX4tE1dDkZVA",
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);
  };

  return { createIncident, sendNotification };
};

export default IncidentActions;
