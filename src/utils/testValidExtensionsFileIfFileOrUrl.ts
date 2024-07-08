export function testValidExtensionFileIfFileOrURL(
  input: string | File,
  fileExtensions: string[],
  URLExtensions: string[]
) {
  if (typeof input === 'string') {
    return extensionValidation(input, URLExtensions);
  } else {
    if (input.type === '') {
      return extensionValidation(input.name, URLExtensions);
    } else {
      if (!fileExtensions.includes(input.type)) {
        return false;
      }
    }
  }
  return true;
}

const extensionValidation = (input: string, URLExtensions: string[]) => {
  const extension = input.split('.').pop()?.toLowerCase();
  if (!extension) throw new Error('Invalid file extension');
  if (!URLExtensions.includes(extension)) {
    return false;
  }
  return true;
};
