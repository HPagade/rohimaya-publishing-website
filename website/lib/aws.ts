import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'phoenixforge-files'

/**
 * Upload a file to S3
 * @param key S3 object key (path)
 * @param body File content (Buffer or string)
 * @param contentType MIME type
 * @param userId User ID for privacy tagging
 * @returns S3 key
 */
export async function uploadToS3(
  key: string,
  body: Buffer | string,
  contentType: string,
  userId: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
    Metadata: {
      userId, // Tag with user ID for privacy/GDPR compliance
      uploadedAt: new Date().toISOString(),
    },
  })

  await s3Client.send(command)
  return key
}

/**
 * Get a signed URL for private file access
 * @param key S3 object key
 * @param expiresIn URL expiration in seconds (default: 1 hour)
 * @returns Signed URL
 */
export async function getSignedS3Url(key: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  return await getSignedUrl(s3Client, command, { expiresIn })
}

/**
 * Delete a file from S3 (GDPR/CCPA compliance)
 * @param key S3 object key
 */
export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  await s3Client.send(command)
}

/**
 * Generate S3 key with user isolation
 * @param userId User ID
 * @param type Asset type ('manuscript', 'cover', 'audiobook', etc.)
 * @param filename Original filename
 * @returns S3 key with user prefix for data isolation
 */
export function generateS3Key(userId: string, type: string, filename: string): string {
  const timestamp = Date.now()
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
  return `users/${userId}/${type}/${timestamp}-${sanitizedFilename}`
}
