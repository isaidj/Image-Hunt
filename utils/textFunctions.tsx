export const upperFirstLetter = (text: string) => {
  const firstLetter = text.charAt(0).toUpperCase() + text.slice(1);
  return firstLetter;
};

export const extractTextAfterLastCharacter = (
  character: string,
  text: string
) => {
  const lastCharacter = text.lastIndexOf(character);
  const result = text.substring(lastCharacter + 1);
  return result;
};
