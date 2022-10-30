const domElementGetter = (id?: string) => {
  const elementId = id || 'pob-application:root';
  return document.getElementById(elementId) as Element;
}

const mergeCustomProps = (customProps: any) => {
  const defaultProps = {
    domElement: domElementGetter(),
  }

  return { ...defaultProps, ...customProps }
}

export { mergeCustomProps, domElementGetter };
