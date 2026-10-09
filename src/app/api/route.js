import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'online',
    system: 'subham.digital Command Center',
    version: '1.0.0',
    message: 'Direct API access is restricted. Unauthorized requests are logged and monitored.',
    documentation: 'Internal Use Only'
  }, { 
    status: 403 
  });
}
