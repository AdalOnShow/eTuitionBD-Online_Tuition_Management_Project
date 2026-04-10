import crypto from "crypto"
import { NextResponse, type NextRequest } from "next/server"
import { auth } from "@/auth"

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

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 30

type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitStore: Map<string, RateLimitEntry> =
  (globalThis as unknown as { __cloudinarySignRateLimit?: Map<string, RateLimitEntry> })
    .__cloudinarySignRateLimit ?? new Map()

;(globalThis as unknown as { __cloudinarySignRateLimit?: Map<string, RateLimitEntry> })
  .__cloudinarySignRateLimit = rateLimitStore

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown"
  }
  return request.headers.get("x-real-ip") ?? "unknown"
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  rateLimitStore.set(ip, entry)
  return entry.count > RATE_LIMIT_MAX
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const clientIp = getClientIp(request)
  if (isRateLimited(clientIp)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 })
  }

  let body: unknown = null
  const contentType = request.headers.get("content-type") ?? ""
  if (contentType.includes("application/json")) {
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
    }
  }

  if (body && typeof body === "object") {
    const { folder, ...rest } = body as { folder?: unknown } & Record<string, unknown>
    if (Object.keys(rest).length > 0) {
      return NextResponse.json({ message: "Unexpected request body" }, { status: 400 })
    }
    if (folder !== undefined && folder !== CLOUDINARY_UPLOAD_FOLDER) {
      return NextResponse.json({ message: "Invalid upload folder" }, { status: 400 })
    }
  }

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
