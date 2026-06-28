export type Berita = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  isodate: string;
  content: string;
};

type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};


export async function fetchCNNNews(): Promise<Berita[]> {
    const res = await fetch(`/api/cnn-news`, {
        next: { revalidate: 60 }
    });
    
    if (!res.ok) {
        throw new Error("Gagal mengambil data dari API CNN");
    }
    const json : ApiResponse<Berita[]> = await res.json();
    return json.data;
}