import { atom } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "0", // default value (aka initial value)
});

export const loginState = atom({
  key: "loginState",
  default: false,
});

const atoms = { textState, loginState };
export default atoms;
