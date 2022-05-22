import { api } from "@instances/api";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";

type UploadRequest = {
  file: File;
  name: string;
  type: string;
};

export const uploadPhotoToS3 = async (
  id: string,
  file: UploadRequest
): Promise<boolean> => {
  try {
    const photoId = uuidV4();
    const filename = `${photoId}.${file.name.split(".").pop()}`;

    let { data } = await api.post("/novels/photos/upload", {
      name: filename,
      type: file.type,
    });

    const toUrl = data.url;

    await axios.put(toUrl, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    await api.post("/novels/photos/store", {
      id,
      photoId,
      filename,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
