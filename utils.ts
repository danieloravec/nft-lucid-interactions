export const toHex = (str: Uint8Array) => {
  return Buffer.from(str).toString("hex");
};
