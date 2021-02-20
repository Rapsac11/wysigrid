import React from "react";
import css from "../css";
import {
  getDebugColorCss,
  withMediaCss,
  basicGridCss,
  getGridMediaCss,
  getElementCss,
} from "../util";

export default function grid({ guideColor = true, ...configs }) {
  const configurations = Object.values(configs).sort((a, b) =>
    a[0][0].breakpoint < b[0][0].breakpoint ? 1 : -1
  );

  const Grid = ({ children }) => (
    <div
      className={css`
        ${basicGridCss}
        ${getGridMediaCss(configurations)}
      `}
    >
      {children}
    </div>
  );

  const processedItems = Object.entries(generateItems(configurations)).reduce(
    (total, [componentName, styleObjects]) => {
      const lowestBreakpointStyleObj = styleObjects[0];

      const baseStyleString = `
        ${getElementCss(lowestBreakpointStyleObj)} 
        ${getDebugColorCss(guideColor)}
      `;

      const mediaStyleStrings = configurations
        .slice(1)
        .map((config, i) =>
          withMediaCss(
            config[0][0].breakpoint,
            getElementCss(styleObjects[i + 1])
          )
        );

      return {
        ...total,
        [componentName]: ({ children }) => (
          <div
            className={css`
              ${baseStyleString}
              ${mediaStyleStrings}
            `}
          >
            {children}
          </div>
        ),
      };
    },
    {
      Grid,
    }
  );

  return processedItems;
}

const generateItems = (list) => {
  let items = {};
  list.forEach((media, i) => {
    media.slice(1).forEach((inputRow, rowIndex) => {
      const rowNum = rowIndex + 1;
      inputRow.slice(1).forEach((gridItem, colIndex) => {
        const colNum = colIndex + 1;
        if (!items[gridItem]) {
          items[gridItem] = {};
        }
        if (!items[gridItem][i]) {
          items[gridItem][i] = {};
          items[gridItem][i]["grid-column-start"] = colNum;
          items[gridItem][i]["grid-row-start"] = rowNum;
        }
        items[gridItem][i]["grid-column-end"] = colNum + 1;
        items[gridItem][i]["grid-row-end"] = rowNum + 1;
      });
    });
  });
  return items;
};
