import { atom } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "0", // default value (aka initial value)
});

export const loginState = atom({
  key: "loginState",
  default: false,
});
export const loginData = atom({
  key: "loginData",
  default: false,
});

const atoms = { textState, loginState, loginData };
export default atoms;
