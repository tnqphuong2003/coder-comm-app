import Card from "./Card";
import Link from "./Link";

function customizeComponents(theme) {
  return { ...Link(theme), ...Card(theme) };
}

export default customizeComponents;
