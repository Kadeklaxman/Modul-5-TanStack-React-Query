"use client";

import { useQuery } from "@tanstack/react-query";

type Berita = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
};

type ApiResponse = {
  data: Berita[];
  message: string;
  status: string;
};

async function fetchBerita() {
  const res = await fetch("/api/cnn-news");

  console.log("Status:", res.status);
  console.log("Status Text:", res.statusText);

  if (!res.ok) {
    const text = await res.text();
    console.log("Response:", text);

    throw new Error(`HTTP ${res.status}`);
  }

  const json = await res.json();

  return json.data;
}

export default function HomePage() {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["berita", "cnn"],
    queryFn: fetchBerita,
  });

console.log(data?.[0]);
  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p>Memuat berita...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-red-600">Error: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-md bg-blue-600 px-3 py-1.5 text-white"
        >
          Coba lagi
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Berita CNN</h1>
        <button
    onClick={() => refetch()}
    disabled={isFetching}
    className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
  >
    {isFetching ? "Memuat ulang..." : "Refresh"}
  </button>

      </div>
      <ul className="mt-8 space-y-4">
        {data?.map((item, idx) => (
          <li key={idx} className="rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Dipublikasikan: {new Date(item.isoDate).toLocaleString("id-ID")}
            </p>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              Baca selengkapnya
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
