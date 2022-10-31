import { pathToActiveWhen } from "single-spa";
import { getPathBasename } from "@Utils";

function routeWithBasePath(route: string) {
  return `${ getPathBasename() }${ route }`;
}

function activeWhenExact(route: string) {
  return pathToActiveWhen(routeWithBasePath(route), true);
}

export { activeWhenExact };