/* eslint-disable no-bitwise,@typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import chroma from 'chroma-js';
// @ts-ignore
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker';

import './index.scss';

// EU GameBoy Color
const defaultGradient = `linear-gradient(90deg,
  #000000 0%,
  #0163c6 33.33%,
  #7bff30 66.66%,
  #ffffff 100%
)`;

// thermal-like
// const defaultGradient = `linear-gradient(90deg,
//   rgb(0, 0, 0) 0%,
//   rgb(92, 0, 128) 10%,
//   rgb(255, 92, 0) 50%,
//   rgb(255, 255, 0) 90%,
//   rgb(255, 255, 255) 100%
// )`;

// inverted thermal-like
// const defaultGradient = `linear-gradient(90deg,
//   rgb(255, 255, 255) 0%,
//   rgb(255, 255, 0) 10%,
//   rgb(255, 92, 0) 50%,
//   rgb(92, 0, 128) 90%,
//   rgb(0, 0, 0) 100%
// )`;

const valueToRGB565 = (value: string) => {
  const r = parseInt(value.slice(1, 3), 16) >> 3;
  const g = parseInt(value.slice(3, 5), 16) >> 2;
  const b = parseInt(value.slice(5, 7), 16) >> 3;

  return parseInt(`${r.toString(2).padStart(5, '0')}${g.toString(2).padStart(6, '0')}${b.toString(2).padStart(5, '0')}`, 2);
};

function App() {
  const [color, setColor] = useState(defaultGradient);
  const { getGradientObject } = useColorPicker(color, setColor);

  const gradient = getGradientObject();

  const colors = chroma
    // @ts-ignore
    .scale(gradient.colors.map(({ value }) => value))
    // @ts-ignore
    .domain(gradient.colors.map(({ left }) => left))
    .colors(256)
    .map(valueToRGB565);

  const body = document.querySelector('body');

  if (body) {
    body.style.background = color;
  }

  return (
    <div className="app styled-scrollbars">
      <h1 className="app__headline">
        Gradient Values
      </h1>
      <p className="app__description">
        { 'A simple tool to generate gradient values for use in the ' }
        <a className="app__link" href="https://github.com/Raphael-Boichot/Mitsubishi-M64282FP-dashcam">dashboy camera</a>
      </p>
      <ColorPicker
        value={color}
        onChange={setColor}
        hideOpacity
        hideColorTypeBtns
        hidePresets
        hideColorGuide
        hideGradientStop
        hideGradientType
        hideGradientAngle
      />
      <pre className="app__output">
        { `[${colors.join(', ')}]` }
      </pre>
      <a className="app__link" href="https://github.com/HerrZatacke/gradient-values">source code</a>
    </div>
  );
}

export default App;
