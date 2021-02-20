export const basicGridCss = `
  display: grid;
  width: 100%;
  height: 100%;
`;

export const getDebugColorCss = (guideColor) =>
  guideColor
    ? `background-color: #${Math.floor(Math.random() * 16777215).toString(16)};
    `
    : "";

export const withMediaCss = (breakpoint, innerCss) => `
  @media (min-width: ${breakpoint}) {${innerCss}}
`;

export const getGridMediaCss = (configurations) =>
  configurations.map((config, i) => {
    const { rowGap, columnGap, breakpoint } = config[0][0];
    const gridTemplateColumns = config[0]
      .slice(1)
      .reduce((total, entry) => `${total} ${entry}`, "");
    const gridTemplateRows = config
      .slice(1)
      .reduce((total, entry) => `${total} ${entry[0]}`, "");
    const gridStyles = `row-gap: ${rowGap};
  column-gap: ${columnGap};
  grid-template-columns: ${gridTemplateColumns};
  grid-template-rows: ${gridTemplateRows};`;
    return i === 0 ? gridStyles : withMediaCss(breakpoint, gridStyles);
  });

export const getElementCss = (styleObject) =>
  styleObject
    ? Object.entries(styleObject).reduce(
        (total, [selector, cssVal]) => `${total} ${selector}: ${cssVal};`,
        `display: unset;`
      )
    : `display: none;`;
