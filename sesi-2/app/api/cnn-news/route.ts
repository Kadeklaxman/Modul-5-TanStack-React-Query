import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://berita-indo-api-next.vercel.app/api/cnn-news/",
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil data dari API CNN");
  }

  const data = await res.json();

  return NextResponse.json(data);
}
