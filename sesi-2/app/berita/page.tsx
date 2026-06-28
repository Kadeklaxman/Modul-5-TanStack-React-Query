"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchCNNNews } from "../lib/api/berita";
import { useState } from "react";

export default function BeritaListPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["berita", "cnn"],
    queryFn: fetchCNNNews,
    staleTime: 5 * 60 * 1000,
  });

  const filteredNews =
    data?.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">Gagal memuat berita</h2>
          <p className="mt-2 text-sm text-red-700">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
          >
            Coba lagi
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div className="mt-6">
          <input
            type="text"
            placeholder="Cari berita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <h1 className="text-3xl font-bold">Berita CNN</h1>
        <span className="text-sm text-gray-500">
          {isFetching ? "Memperbarui..." : `${data?.length} artikel`}
        </span>
      </div>
{filteredNews.length === 0 && !isLoading && (
  <p className="mt-6 text-center text-gray-500">
    Berita tidak ditemukan.
  </p>
)}
      <ul className="mt-8 space-y-4">
        {filteredNews?.map((item, idx) => (
          <li
            key={idx}
            className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-300"
          >
            <h2 className="font-semibold text-gray-900">{item.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            <p className="mt-2 text-xs text-gray-400">
              {new Date(item.isodate ?? item.pubDate).toLocaleString("id-ID")}
            </p>
            <Link
              href={`/berita/${encodeURIComponent(item.link)}`}
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              Baca selengkapnya
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => refetch()}
        className="mt-8 w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        Muat ulang manual
      </button>
    </main>
  );
}
