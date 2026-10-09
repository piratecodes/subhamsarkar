import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Function to get the true root directory (fixes standalone mode storage path)
function getTrueRoot() {
  let cwd = process.cwd();
  if (cwd.endsWith('.next/standalone') || cwd.endsWith('.next/standalone/')) {
    return path.resolve(cwd, '../../');
  }
  return cwd;
}

// Define the permanent storage directory outside of the .next build folder
const STORAGE_DIR = process.env.UPLOAD_DIR || path.join(/*turbopackIgnore: true*/ getTrueRoot(), 'storage', 'uploads');

export async function GET(request, { params }) {
  try {
    const { slug = [] } = await params;
    const filePath = path.join(/*turbopackIgnore: true*/ STORAGE_DIR, ...slug);

    // Security check to prevent directory traversal attacks
    if (!filePath.startsWith(STORAGE_DIR)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    // Determine content type based on extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    
    // Read file as buffer
    const buffer = await fs.promises.readFile(filePath);
    
    // Create Response
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('Media proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
