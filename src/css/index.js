import sheet from "./styleSheet";

export default function css(strings, ...values) {
  const styleString = mergeStrings(strings, values);
  const index = sheet.cssRules.length;
  const className = `grid-item-${index.toString(36)}`;
  const rule = `.${className} { ${styleString} }`;

  const mediaQueries = extractMediaQueries(styleString);
  mediaQueries.forEach(({ mediaValue, mediaCss }) => {
    const mediaRule = `${mediaValue} {
        .${className} {
          ${mediaCss}
        }
      }`;
    sheet.insertRule(mediaRule, index);
  });
  sheet.insertRule(rule, index);
  return className;
}

const extractMediaQueries = (styleString) =>
  styleString
    .split("@media")
    .slice(1)
    .reduce((total, chunk) => {
      const [breakpoint, rest] = chunk.split("{");

      const mediaValue = `@media ${breakpoint}`;

      const mediaCss = rest.split("}")[0];
      return [...total, { mediaValue, mediaCss }];
    }, []);

const mergeStrings = (strings, values) =>
  strings.reduce((final, str, i) => {
    const value =
      values[i] === undefined || values[i] === null ? "" : values[i];

    const line = str + value;
    return final + line;
  }, "");
