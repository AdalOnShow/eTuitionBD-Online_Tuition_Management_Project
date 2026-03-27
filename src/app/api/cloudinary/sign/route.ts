import crypto from "crypto"
import { NextResponse } from "next/server"

const CLOUDINARY_UPLOAD_FOLDER = "etuitionbd/users"

function buildSignature(payload: Record<string, string | number>, secret: string) {
  const sortedEntries = Object.entries(payload).sort(([a], [b]) =>
    a.localeCompare(b)
  )
  const serialized = sortedEntries.map(([key, value]) => `${key}=${value}`).join("&")
  return crypto
    .createHash("sha1")
    .update(`${serialized}${secret}`)
    .digest("hex")
}

export async function POST() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { message: "Cloudinary credentials are missing." },
      { status: 500 }
    )
  }

  const timestamp = Math.floor(Date.now() / 1000)
  const signature = buildSignature(
    {
      folder: CLOUDINARY_UPLOAD_FOLDER,
      timestamp,
    },
    apiSecret
  )

  return NextResponse.json({
    cloudName,
    apiKey,
    folder: CLOUDINARY_UPLOAD_FOLDER,
    timestamp,
    signature,
  })
}
