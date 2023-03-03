// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

function getError(error: unknown) {
  if (error instanceof Error) return error
  return new Error(String(error))
}

export const handleError = (message: string, e: unknown) => {
  const error = getError(e)
  console.error(message, error)

  return error
}
