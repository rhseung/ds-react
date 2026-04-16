/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { addons, types, useGlobals } from 'storybook/manager-api';

const ADDON_ID = 'accent-color-picker';
const TOOL_ID = `${ADDON_ID}/tool`;

function AccentColorPicker() {
  const [globals, updateGlobals] = useGlobals();
  const accent = (globals.accent as string) ?? '#2563EB';

  return (
    <div
      title="Accent color"
      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px' }}
    >
      <input
        type="color"
        value={accent}
        onChange={(e) => updateGlobals({ accent: e.target.value })}
        style={{
          width: 24,
          height: 24,
          padding: 0,
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          background: 'none',
        }}
      />
    </div>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Accent color',
    render: () => <AccentColorPicker />,
  });
});
