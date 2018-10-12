import React from 'react';
import randomColor from 'randomcolor';

export default ({ slug, length, style, ...props }) => {
  const userColorPrimary = randomColor({ luminosity: 'dark', seed: slug });
  const userColorSecondary = randomColor({ luminosity: 'light', seed: slug });

  return (
    <div
      style={{
        background: `repeating-linear-gradient(45deg, ${userColorPrimary}, ${userColorPrimary} ${length}px, ${userColorSecondary} ${length}px, ${userColorSecondary} ${length * 2}px)`,
        ...style
      }}
      {...props}
    >
    </div>
  );
}
