import { printRules } from "./utils";

const styleEl = document.createElement("style");
document.head.appendChild(styleEl);
const sheet = styleEl.sheet;

function css(selector, styleString) {
  const rule = `${selector} { ${styleString} }`;
  const index = sheet.cssRules.length;

  sheet.insertRule(rule, index);
}

css(".zero", "color: blue;");
css(
  ".one",
  `
    font-size: 16px;
    background: rgba(0, 0, 0, 0.11);
  `
);
printRules(sheet);
