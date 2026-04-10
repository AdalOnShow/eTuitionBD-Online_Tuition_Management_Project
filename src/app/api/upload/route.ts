import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CLOUDINARY_UPLOAD_FOLDER = "etuitionbd/users";
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function buildSignature(
  payload: Record<string, string | number>,
  secret: string,
) {
  const sortedEntries = Object.entries(payload).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  const serialized = sortedEntries
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return crypto
    .createHash("sha1")
    .update(`${serialized}${secret}`)
    .digest("hex");
}

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { message: "Cloudinary credentials are missing." },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "Invalid form data." },
      { status: 400 },
    );
  }

  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { message: "Image file is required." },
      { status: 400 },
    );
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { message: "Only image uploads are allowed." },
      { status: 400 },
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json(
      { message: "Image size must be 2MB or less." },
      { status: 400 },
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = buildSignature(
    {
      folder: CLOUDINARY_UPLOAD_FOLDER,
      timestamp,
    },
    apiSecret,
  );

  const cloudinaryForm = new FormData();
  cloudinaryForm.append("file", file);
  cloudinaryForm.append("api_key", apiKey);
  cloudinaryForm.append("timestamp", String(timestamp));
  cloudinaryForm.append("folder", CLOUDINARY_UPLOAD_FOLDER);
  cloudinaryForm.append("signature", signature);

  let uploadResponse: Response;
  try {
    uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      },
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to upload image." },
      { status: 502 },
    );
  }

  const uploadPayload = await uploadResponse.json().catch(() => null);

  if (!uploadResponse.ok) {
    const errorMessage =
      uploadPayload?.error?.message ?? "Image upload failed.";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    url: uploadPayload.secure_url,
    publicId: uploadPayload.public_id,
  });
}
