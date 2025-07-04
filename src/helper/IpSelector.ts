export const isIPv4 = (input: string) =>
  /^(\d{1,3}\.){3}\d{1,3}$/.test(input) &&
  input.split(".").every((num) => Number(num) >= 0 && Number(num) <= 255);

export const isIPv6 = (input: string) =>
  /^[0-9a-fA-F:]+$/.test(input) && input.includes(":");

export const isDomain = (input: string) =>
  /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(input);

export const detectInputType = (
  input: string
): "ipv4" | "ipv6" | "domain" | "invalid" => {
  if (isIPv4(input)) return "ipv4";
  if (isIPv6(input)) return "ipv6";
  if (isDomain(input)) return "domain";
  return "invalid";
};
