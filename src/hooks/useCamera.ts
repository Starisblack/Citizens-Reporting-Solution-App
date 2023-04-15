import { useState } from "react";
// import { isPlatform } from '@ionic/react';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

export function useCamera() {
  const [captureImage, setcaptureImage] = useState();

  function blobToFile(theBlob: any, fileName: any) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    setcaptureImage(theBlob);
    return theBlob;
  }

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 90,
      width: 500,
    });

    const fileName = new Date().getTime() + ".jpeg";

    const picBlob = await fetch(photo.webPath!)
      .then((res) => res.blob())
      .then(async (blob) => {
        return blob;
      });

    const file = await blobToFile(picBlob, fileName);

    return { file: file, photoPath: photo.webPath! };
  };

  return {
    takePhoto,
    captureImage,
  };
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
