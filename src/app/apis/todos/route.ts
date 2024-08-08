import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

function getIdFromPathname(s: String) {
  let parts = s.split("/")
  return parts[parts.length-1]
}

export async function GET(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const id = getIdFromPathname(path)
    console.log(id)

    const todos = await prisma.todo.findMany()
    return NextResponse.json({msg: "found all todos", success: true, todos})
  }
  catch (error) {
    return NextResponse.json({msg: "Problem"}, {status: 500})
  }
}

export async function POST(req: NextRequest) {
  try {
    const { desc } = await req.json();

    await prisma.todo.create({
      data: {
        desc: desc,
        completed: false
      }
    })

    return NextResponse.json({msg: "todo added", success: true})
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({msg: "Problem"}, {status: 500})
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await prisma.todo.deleteMany();
    return NextResponse.json({msg: "todos cleared", success: true})
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({msg: "Problem"}, {status: 500})
  }
}