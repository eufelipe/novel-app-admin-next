import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed, ok, serverError } from "@helpers/http-helpers";

import s3 from "@instances/s3";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    return methodNotAllowed(response);
  }
  try {
    let { name, type } = request.body;

    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    return ok(response, { url });
  } catch (error) {
    console.log(error);
    return serverError(response);
  }
};
