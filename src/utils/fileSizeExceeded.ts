export function fileSizeExceeded(input: File) {
  return input.size > 2 * 1024 * 1024;
}
