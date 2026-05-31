export function gettext(message: string, ...args: any[]): string {
  return message.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== "undefined" ? args[index] : match;
  });
}
