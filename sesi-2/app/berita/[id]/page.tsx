"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchCNNNews } from "@/app/lib/api/berita";

export default function BeritaDetailPage() {
  const params = useParams<{ id: string }>();

  const id = Number(params.id);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["berita", "cnn", id],

    queryFn: async () => {
      const berita = await fetchCNNNews();

      if (id < 0 || id >= berita.length) {
        throw new Error("Berita tidak ditemukan");
      }

      return berita[id];
    },

    placeholderData: (previousData) => previousData,
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl p-10">
        <p>Memuat berita...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-2xl p-10">
        <p className="text-red-600">{error.message}</p>
      </main>
    );
  }
  if (!data) {
    return (
      <main className="mx-auto max-w-2xl p-10">
        <p>Data tidak ditemukan.</p>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-2xl p-10">
      {isFetching && <p className="mb-4 text-blue-500">Memperbarui data...</p>}

      <h1 className="text-3xl font-bold">{data.title}</h1>

      <p className="mt-4 text-gray-500">
        {new Date(data.isoDate ?? data.pubDate).toLocaleString("id-ID")}
      </p>

      <img src={data.thumbnail} alt={data.title} className="mt-6 rounded-lg" />

      <p className="mt-6">{data.description}</p>

      <div className="mt-10 flex gap-4">
        <Link
          href={`/berita/${id - 1}`}
          className="rounded bg-gray-200 px-4 py-2"
        >
          ← Sebelumnya
        </Link>

        <Link
          href={`/berita/${id + 1}`}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Berikutnya →
        </Link>
      </div>
    </main>
  );
}
