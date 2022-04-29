export function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }

  // patching the existing style
  return {
    ...style,
    transition: `transform .01s ease`,
  };
}
