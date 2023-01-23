import * as Crypto from 'expo-crypto'

export const generateUniqueId = async () =>
  await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA1,
    Math.random().toString()
  )
