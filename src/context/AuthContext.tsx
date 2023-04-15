import { createContext, ReactNode, useContext, useEffect, useState} from "react";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
import db,  { auth} from "../firebase-config";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import { FCM } from "@capacitor-community/fcm";
import { PushNotifications } from "@capacitor/push-notifications";


interface ExampleFCProps {
  children: ReactNode;
}

const UserContext = createContext<any>({});

export const AuthContextProvider: React.FC<ExampleFCProps> = ({children}) => {


    const [user, setUser] = useState<{} | any >({})
    const [incidentLists, setIncidentLists] = useState<any>([])
 

const signInUser = (email:string, password: string) => {
  return  signInWithEmailAndPassword(auth, email, password);
}
        
  const createUser =  (email:string, password: string) => {
   
    return  createUserWithEmailAndPassword(auth, email, password)

  }

const signUserOut = () => {

  return  signOut(auth);
}

const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email)
}






useEffect(()=>{

 const  subscribeTo = () => {
    PushNotifications.register()
      .then((_) => {
        FCM.subscribeTo({ topic: "news" })
          .then((r) => console.log("subscribed to topic"))
          .catch((err) => console.log(err));
      })
      .catch((err) => alert(JSON.stringify(err)));
  }


      const q = query(collection(db, 'incidents'), orderBy('created', 'desc'))
      onSnapshot(q, (querySnapshot) => {
      setIncidentLists(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
  
})
    
  subscribeTo();

}, [])


useEffect(()=> {
       const unsubcribe =  onAuthStateChanged(auth, (currentUser) =>{

          setUser(currentUser);
       } )
    return ()=> { unsubcribe()};
  }, [])

    return (
        <UserContext.Provider value={{createUser, signInUser, user, signUserOut, incidentLists, resetPassword}}>
            {children}
        </UserContext.Provider>
    ) 

}


export const UserAuth = () => {

    return useContext(UserContext)

}