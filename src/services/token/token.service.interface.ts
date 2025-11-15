import type { GenerateTokenParams } from './token.types'

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
}
