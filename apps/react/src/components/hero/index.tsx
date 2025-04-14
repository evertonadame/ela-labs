type HeroProps = {
  title: string;
  version: string;
  infos?: string[];
  extras?: string[];
};

export function Hero({ title, version, extras, infos }: HeroProps) {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">{`#${title} ${version}`}</h2>
      {infos?.map((info, index) => (
        <p key={index} className="mb-4 text-muted-foreground">
          {info}
        </p>
      ))}
      {extras?.map((extra, index) => (
        <ul
          key={index}
          className="list-disc list-inside mb-4 text-muted-foreground"
        >
          <li className="mb-2">{extra}</li>
        </ul>
      ))}
    </div>
  );
}
