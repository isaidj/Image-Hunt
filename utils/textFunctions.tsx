export const upperFirstLetter = (text: string) => {
  const firstLetter = text.charAt(0).toUpperCase() + text.slice(1);
  return firstLetter;
};

console.log(upperFirstLetter("hola como estas?"));
