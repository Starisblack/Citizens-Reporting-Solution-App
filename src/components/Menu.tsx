import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  personOutline,
  logOutOutline,
  cogOutline,
  documentTextOutline,
  logInOutline,
} from "ionicons/icons";
import "./Menu.css";
import logo from "../assets/images/logo.svg";
import { UserAuth } from "../context/AuthContext";
import Alert from "./Alert/Alert";

interface menuItem {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  clicked: any;
}

const menuItems: menuItem[] = [
  {
    title: "Profile",
    url: "/page/Profile",
    iosIcon: personOutline,
    mdIcon: personOutline,
    clicked: "",
  },

  {
    title: "Entries",
    url: "/page/Entries",
    iosIcon: documentTextOutline,
    mdIcon: documentTextOutline,
    clicked: () => {},
  },
  {
    title: "Settings",
    url: "/page/Settings",
    iosIcon: cogOutline,
    mdIcon: cogOutline,
    clicked: "",
  },
  {
    title: "LogOut",
    url: "",
    iosIcon: logOutOutline,
    mdIcon: logOutOutline,
    clicked: { type: "logOut" },
  },
];

const loginMenu: any = {
  title: "Login",
  url: "/login",
  iosIcon: logInOutline,
  mdIcon: logInOutline,
  clicked: "",
};

const Menu: React.FC = () => {
  const location = useLocation();
  const { signUserOut, user } = UserAuth();
  const { alert } = Alert();

  // const {state, dispatch} = useContext(AppContext);

  const onClickHandler = async (title: string) => {
    switch (title) {
      case "LogOut":
        return alert(signUserOut, "/");
      default:
        return;
    }
  };

  let menuLists = (
    <div>
      <IonMenuToggle autoHide={false}>
        <IonItem
          onClick={() => {
            onClickHandler(loginMenu.title);
          }}
          className={location.pathname === loginMenu.url ? "selected" : ""}
          routerLink={loginMenu.url}
          routerDirection="none"
          lines="none"
          detail={false}
        >
          <IonIcon slot="start" ios={loginMenu.iosIcon} md={loginMenu.mdIcon} />
          <IonLabel>{loginMenu.title}</IonLabel>
        </IonItem>
      </IonMenuToggle>
    </div>
  );

  if (user) {
    menuLists = (
      <>
        {menuItems.map((menuItem, index) => {
          return (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                onClick={() => {
                  onClickHandler(menuItem.title);
                }}
                className={location.pathname === menuItem.url ? "selected" : ""}
                routerLink={menuItem.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon
                  slot="start"
                  ios={menuItem.iosIcon}
                  md={menuItem.mdIcon}
                />
                <IonLabel>{menuItem.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          );
        })}
      </>
    );
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <div className="text-center">
            <img
              style={{ height: "170px", width: "170px" }}
              src={logo}
              alt="logo"
            />
          </div>

          {menuLists}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
