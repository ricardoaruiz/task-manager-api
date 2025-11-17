import type { CompareHashParams, GenerateHashParams } from './hash.types'

/**
 * Service responsible for hashing and comparing hashed values.
 * It provides methods to generate hashed text from plain text
 * and to compare plain text with hashed text.
 */
export interface HashService {
  /**
   * Generates a hashed version of the provided plain text.
   * @param plainText - The plain text to be hashed.
   * @returns The hashed text.
   */
  generate({ plainText }: GenerateHashParams): string

  /**
   * Compares a plain text with a hashed text to check if they match.
   * @param plainText - The plain text to compare.
   * @param hashedText - The hashed text to compare against.
   * @returns True if the texts match, false otherwise.
   */
  compare({ plainText, hashedText }: CompareHashParams): boolean
}
