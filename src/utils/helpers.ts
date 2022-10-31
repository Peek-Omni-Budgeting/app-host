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

const getPathBasename = () => {
  const pathName = window.location.pathname;
  const re = /(?:.*)\/(.*)\/(\d+\.\d+)\//  //'app-name/x.x.x
  const baseNameMatch = pathName.match(re);
  const baseName = baseNameMatch ? baseNameMatch[0] : '';

  return baseName.slice(0, -1);
}

export { mergeCustomProps, domElementGetter, getPathBasename };
