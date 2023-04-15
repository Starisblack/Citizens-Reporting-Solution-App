import "./AddIncident.css";
import {
  IonButtons,
  IonCol,
  IonImg,
  IonLoading,
  IonDatetime,
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";
import { format, parseISO } from "date-fns";
import IncidentActions from "../Incident";
import { Timestamp } from "firebase/firestore";
import { useHistory } from "react-router";
import { CapacitorHttp } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { Diagnostic } from "@awesome-cordova-plugins/diagnostic";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase-config";
import { useCamera } from "../../../hooks/useCamera";

const AddIncident: React.FC = () => {
  const { takePhoto } = useCamera();
  const { createIncident, sendNotification } = IncidentActions();
  const history = useHistory();
  const dateModal = useRef<HTMLIonModalElement>(null);
  const timeModal = useRef<HTMLIonModalElement>(null);

  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [incident, setIncident] = useState({
    category: "",
    time: "",
    date: "",
    description: "",
    location: "",
  });

  const [file, setFile] = useState<any>(null);
  const [capturedImgPath, setcapturedImgPath] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChangeHandler = async (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setIncident((prevValue: any) => {
      return { ...prevValue, [name]: value };
    });
  };

  const onDateHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    const formattedString = format(parseISO(value), "MMM d, yyyy");

    setIncident((prevValue: any) => {
      return { ...prevValue, [name]: formattedString };
    });
  };

  const cancel = () => {
    setShowTime(false);
    setIsOpen(false);
  };
  const confirm = () => {
    setShowTime(false);
    setIsOpen(false);
  };

  const onTImeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    const formattedString = format(parseISO(value), "hh:mmaaa");

    setIncident((prevValue: any) => {
      return { ...prevValue, [name]: formattedString };
    });
  };

  const cameraHandler = async () => {
    const captureImage = await takePhoto();

    setFile(captureImage.file);
    setcapturedImgPath(captureImage.photoPath);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    uploadIncidentImage(file);
  };

  const uploadIncidentImage = (file: any) => {
    /** @type {any} */
    const metadata: any = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            let postData = {
              category: incident.category,
              time: incident.time,
              date: incident.date,
              description: incident.description,
              location: incident.location,
              created: Timestamp.now(),
              incidentImg: downloadURL,
              imgRef: file.name,
            };

            createIncident(postData);
            sendNotification(
              postData.category,
              postData.description.slice(0, 15)
            );
            setLoading(false);
            setIncident({
              category: "",
              time: "",
              date: "",
              description: "",
              location: "",
            });

            setFile(null);
            setcapturedImgPath(null);

            history.push("/incident/thank-you");
          })
          .catch((err) => {
            alert(err);
            setLoading(false);
          });
      }
    );
  };

  const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;

    let geoApiKey = "bdc_e8dd761c1c3c40eba09dd9fbb0eb5bb5";

    let geoApiUrl =
      "https://api-bdc.net/data/reverse-geocode?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&localityLanguage=en&key=" +
      geoApiKey;
    const options = {
      url: geoApiUrl,
    };
    const response = await CapacitorHttp.request({ ...options, method: "GET" });
    const locationData = response.data;
    let city = locationData.city;
    let state = locationData.principalSubdivision + " State.";

    const currentCity = city + ", " + state;

    setIncident((prevValue: any) => {
      return { ...prevValue, location: currentCity };
    });

    setLoadingLocation(false);
  };

  const getLocation = async () => {
    setLoadingLocation(true);

    const isLocationEnable = await Diagnostic.isLocationEnabled();

    if (isLocationEnable) {
      await printCurrentPosition();
    } else {
      alert("Turn location on for your phone");
      setLoadingLocation(false);
      Diagnostic.switchToLocationSettings();
    }
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
          <IonTitle>Report an Incident</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={loading}
          // onDidDismiss={ ()=> state.auth && alert("account created successfully")}
          message={"sending..."}
        />

        <IonLoading
          cssClass="my-custom-class"
          isOpen={loadingLocation}
          // onDidDismiss={ ()=> state.auth && alert("account created successfully")}
          message={"getting your location..."}
        />

        <main>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Report an Incident</IonTitle>
            </IonToolbar>
          </IonHeader>

          {/* time picker for incident */}

          <IonModal
            onDidDismiss={() => setShowTime(false)}
            isOpen={showTime}
            id="modal"
            keepContentsMounted={true}
            ref={timeModal}
          >
            <div className="">
              <IonDatetime
                name="time"
                onIonChange={onTImeHandler}
                presentation="time"
                locale="en-GB-u-hc-h12"
              ></IonDatetime>
              <IonButtons slot="buttons" className="model-btn">
                <IonButton color="danger" onClick={cancel}>
                  CANCEL
                </IonButton>
                <IonButton color="primary" onClick={confirm}>
                  DONE
                </IonButton>
              </IonButtons>
            </div>
          </IonModal>

          {/* date picker for incident */}
          <IonModal
            onDidDismiss={() => setIsOpen(false)}
            isOpen={isOpen}
            id="modal"
            keepContentsMounted={true}
            ref={dateModal}
          >
            <div className="">
              <IonDatetime
                name="date"
                onIonChange={onDateHandler}
                presentation="date"
                locale="en-GB-u-hc-h12"
              ></IonDatetime>
            </div>
            <IonButtons slot="buttons" className="model-btn">
              <IonButton color="danger" onClick={cancel}>
                CANCEL
              </IonButton>
              <IonButton color="primary" onClick={confirm}>
                DONE
              </IonButton>
            </IonButtons>
          </IonModal>

          <form onSubmit={onSubmitHandler}>
            <div className="input-group mb-3">
              <label className="input-group my-2">Type of Incident</label>
              <select
                onChange={onChangeHandler}
                className="form-select"
                name="category"
                value={incident.category}
                required
              >
                <option>Choose...</option>
                <option value="Accident">Accident</option>
                <option value="Fire">Fire Hazard</option>
                <option value="Security">Security</option>
                <option value="Riot">Riot</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Time of Incident</label>

              <input
                onClick={() => setShowTime(true)}
                type="text"
                readOnly
                className="form-control"
                placeholder="Time of incident"
                value={incident.time}
                name="time"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Incident</label>
              <input
                onClick={() => setIsOpen(true)}
                readOnly
                type="text"
                className="form-control"
                placeholder="Pick date"
                value={incident.date}
                name="date"
              />
            </div>

            <div className="input-group mb-3 location">
              <label className="form-label">Location of Incident</label>
              {/* <input type="text" className="form-control" placeholder="Latitude" name="Latitude" value=""  required/>
            <input type="text" className="form-control" placeholder="Longitude" name="Longitude" value=""  required/> */}
              <div className="row location-container">
                <div className="col-7 p-0">
                  <input
                    onChange={onChangeHandler}
                    type="text"
                    className="form-control w-100 location"
                    readOnly
                    placeholder="location"
                    name="location"
                    required
                    value={incident.location}
                  />
                </div>

                <div className="col-5">
                  <IonButton
                    onClick={getLocation}
                    id="getPosition"
                    color="dark"
                    expand="full"
                  >
                    Get Position
                  </IonButton>
                  {/* <button onClick={getLocation} id="getPosition" type="button" className="btn btn-secondary btn-sm">get position</button> */}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description of Incident</label>
              <textarea
                onChange={onChangeHandler}
                className="form-control"
                name="description"
                value={incident.description}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Incident Photo</label>

              <IonCol size="6">
                {capturedImgPath && <IonImg src={capturedImgPath} />}
              </IonCol>
              <IonButton
                id="cameraBtn"
                onClick={cameraHandler}
                color="medium"
                expand="block"
              >
                Take a Photo
              </IonButton>
            </div>
            <button
              id="submitIncident"
              type="submit"
              className="w-100 btn btn-lg btn-primary"
            >
              Submit
            </button>
          </form>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default AddIncident;
