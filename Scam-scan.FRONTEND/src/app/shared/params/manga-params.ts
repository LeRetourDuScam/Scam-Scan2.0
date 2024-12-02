export interface MangaParams {
    pageSize: number,
    pageNumber: number,
    slug: string,
    genre: string[],
    status: string[],
    author: string,
    popularity: number,
    language: string[],
    rating: number,
    type: string[],
    orderBy: string,
}