export const getColor = (type: string) => {
  if (type === "grass") {
    return "bg-[#3FA129]";
  } else if (type === "fire") {
    return "bg-[#E62829]";
  } else if (type === "water") {
    return "bg-[#2980EF]";
  } else if (type === "normal") {
    return "bg-[#9FA19F]";
  } else if (type === "bug") {
    return "bg-[#91A119]";
  } else if (type === "electric") {
    return "bg-[#FAC000]";
  } else if (type === "flying") {
    return "bg-[#81B9EF]";
  } else if (type === "fighting") {
    return "bg-[#FF8000]";
  } else if (type === "dragon") {
    return "bg-[#5060E1]";
  } else if (type === "ice") {
    return "bg-[#3DCEF3]";
  } else if (type === "psychic") {
    return "bg-[#EF4179]";
  } else if (type === "ghost") {
    return "bg-[#704170]";
  } else if (type === "dark") {
    return "bg-[#624D4E]";
  } else if (type === "fairy") {
    return "bg-[#EF70EF]";
  } else if (type === "rock") {
    return "bg-[#AFA981]";
  } else if (type === "ground") {
    return "bg-[#915121]";
  } else if (type === "steel") {
    return "bg-[#60A1B8]";
  } else if (type === "poison") {
    return "bg-[#9141CB]";
  } else if (type === "stellar") {
    return "bg-[#40B5A5]";
  }
};
