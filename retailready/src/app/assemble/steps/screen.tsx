export default function Screen({ param }: { param: string[] }) {
  return param.map((step, index) => <Step key={index} param={step} />);
}

export function Step({ param }: { param: string }) {
  if (param.endsWith(".png")) {
    return <Image url={param} />;
  }
  return <Text text={param} />;
}

export function Text({ text }: { text: string }) {
  return <div>{text}</div>;
}

export function Image({ url }: { url: string }) {
  return <img src={`/pics/${url}`} alt="Step Image" />;
}
