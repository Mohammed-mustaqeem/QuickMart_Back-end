import { nanoid } from "nanoid";

const generateID = (prefix) => {
  let unique = nanoid(10);

  return `${prefix} - ${unique}`;
};

export default generateID;
