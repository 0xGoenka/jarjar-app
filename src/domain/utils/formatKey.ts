export const formatKey = (key: string) => {
  const firstFiveChars = key.slice(0, 5);
  const lastFiveChars = key.slice(-5);

  return {
    formatedKey: `${firstFiveChars}...${lastFiveChars}`,
    key,
  };
};
