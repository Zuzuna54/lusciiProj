/**
 * Interface for Note objects
 */
export interface INote {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Interface for creating a new Note
 */
export interface ICreateNote {
    content: string;
}

/**
 * Class representing a Note
 */
export class Note implements INote {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, content: string) {
        this.id = id;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * Validates the content of a note
     * @param content - The note content to validate
     * @returns boolean indicating if content is valid
     */
    static isValidContent(content: unknown): boolean {
        return (
            typeof content === 'string' &&
            content.trim().length > 0 &&
            content.length <= 1000 // Setting a maximum length for content
        );
    }

    /**
     * Validates an ID format (assumes UUID format)
     * @param id - The ID to validate
     * @returns boolean indicating if ID is valid
     */
    static isValidId(id: unknown): boolean {
        if (typeof id !== 'string') return false;

        // Simple UUID validation regex
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    }
} 