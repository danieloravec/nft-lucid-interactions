export const toHex = (str: string) => {
  return Buffer.from(str).toString("hex");
};
