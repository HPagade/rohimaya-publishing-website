// Document Parser - Extracts text from various file formats

export async function parseDocument(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // PDF
  if (file.type === 'application/pdf') {
    // Simple PDF text extraction (in production, use pdf-parse)
    return buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, '')
  }

  // DOCX
  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // Simple DOCX parsing (in production, use mammoth)
    return buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, '')
  }

  // Plain text
  if (file.type === 'text/plain') {
    return buffer.toString('utf-8')
  }

  throw new Error('Unsupported file type')
}
