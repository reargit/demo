export interface CatalogItem {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    streamUrl: string;
    duration: number;
}

export interface CatalogResponse {
    items: CatalogItem[];
}
