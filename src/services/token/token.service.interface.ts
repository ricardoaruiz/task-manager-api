import type { GenerateTokenParams, JwtPayload } from './token.types'

/**
 * Interface for the Token Service.
 * Defines the contract for generating tokens.
 */
export interface TokenService {
  /**
   * Generates a token based on the provided parameters.
   * @param params - Parameters required to generate the token.
   * @returns A promise that resolves to the generated token string.
   */
  generateToken(params: GenerateTokenParams): Promise<string>

  /**
   * Verifies the provided token and returns the payload if valid.
   * @param token - The token string to verify.
   * @returns A promise that resolves to the token payload or null if invalid.
   */
  verifyToken(token: string): Promise<JwtPayload | null>
}
