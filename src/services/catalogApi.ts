import catalogData from '../assets/catalog.json';
import { CatalogItem } from '../types/catalog';

/**
 * Simulates network delay
 */
const delay = (ms: number = 500): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock API service for catalog data
 */
export const catalogApi = {
    /**
     * Get all catalog items
     * @param delayMs - Simulated network delay in milliseconds
     */
    async getAllItems(delayMs: number = 500): Promise<CatalogItem[]> {
        await delay(delayMs);
        return catalogData.items;
    },
};
