import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const users = [
    {key: 1, nome: 'Matheus'},
    {key: 2, nome: 'Bruno'},
    {key: 3, nome: 'Carlos'}
  ]

  return NextResponse.json(users)
}