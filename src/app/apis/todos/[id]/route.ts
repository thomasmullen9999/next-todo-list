import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    console.log(req.nextUrl.pathname)
    const todos = await prisma.todo.findMany()
    return NextResponse.json({msg: "found todo(s)", success: true, todos})
  }
  catch (error) {
    return NextResponse.json({msg: "Problem"}, {status: 500})
  }
}