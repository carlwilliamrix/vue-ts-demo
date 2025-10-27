// Define core types with, Typescript helping to maintain type safety
export interface Event {
    id: string;
    name: string;
    location: string;
    active: boolean;
}

export type EventFilter = "all" | "Active" | "Inactive";