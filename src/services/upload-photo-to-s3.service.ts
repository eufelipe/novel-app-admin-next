import { api } from "@instances/api";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";

type UploadRequest = {
  files: File[];
  name: string;
  type: string;
};

export const uploadPhotoToS3 = async (
  id: string,
  files: UploadRequest[]
): Promise<boolean> => {
  try {
    for (const file of files) {
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

      console.log("filename", filename, toUrl);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
