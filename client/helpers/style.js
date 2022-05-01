export function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }

  // patching the existing style
  return {
    ...style,
    // opacity: 0,
    transition: `transform .001s ease`,
  };
}
