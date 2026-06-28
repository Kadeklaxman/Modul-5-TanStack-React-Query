'use client';

import { Berita, fetchCNNNews } from '@/app/lib/api/berita';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
export default function BeritaDetailPage() {
  const params = useParams<{ link: string }>();
  const router = useRouter();
  const encodedLink = params.link;
  const decodedLink = decodeURIComponent(encodedLink);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['berita', 'cnn', encodedLink],
    queryFn: async (): Promise<Berita> => {
      const list = await fetchCNNNews();
      const found = list.find((b) => b.link === decodedLink);
      if (!found) {
        throw new Error('Berita tidak ditemukan');
      }
      return found;
    },
    enabled: !!encodedLink,
  });

  if (isLoading) {
    return (
      <main className='mx-auto max-w-2xl px-6 py-16'>
        <p>Memuat...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className='mx-auto max-w-2xl px-6 py-16'>
        <p className='text-red-600'>{error.message}</p>
        <button
          onClick={() => router.back()}
          className='mt-4 text-sm text-blue-600 hover:underline'
        >
          Kembali
        </button>
      </main>
    );
  }

  return (
    <main className='mx-auto max-w-2xl px-6 py-16'>
      <button
        onClick={() => router.back()}
        className='text-sm text-gray-500 hover:text-gray-700'
      >
        ← Kembali
      </button>
      <h1 className='mt-4 text-3xl font-bold'>{data.title}</h1>
      <p className='mt-2 text-sm text-gray-500'>
        {new Date(data.isoDate ?? data.pubDate).toLocaleString('id-ID')}
      </p>
      <p className='mt-6 text-lg leading-relaxed text-gray-700'>
        {data.description}
      </p>
      <a
        href={data.link}
        target='_blank'
        rel='noopener noreferrer'
        className='mt-8 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
      >
        Buka sumber asli
      </a>
    </main>
  );
}