declare module "*.inline.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "*.eot" {
  const content: string;
  export default content;
}

declare module "*.ttf" {
  const content: string;
  export default content;
}