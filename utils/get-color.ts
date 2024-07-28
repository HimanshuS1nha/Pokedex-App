export const getColor = (type: string) => {
  if (type === "grass") {
    return "bg-green-600";
  } else if (type === "fire") {
    return "bg-red-600";
  } else if (type === "water") {
    return "bg-blue-600";
  }
};
