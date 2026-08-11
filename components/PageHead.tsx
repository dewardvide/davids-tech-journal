/** Kicker + h1 + lede. The standard head of every page but the home page. */
export function PageHead({ kicker, title, lede }: { kicker?: string; title: string; lede?: string }) {
  return (
    <header style={{ marginTop: '3.2em' }}>
      {kicker ? <div className="dtj-kicker">{kicker}</div> : null}
      <h1 style={{ marginTop: kicker ? '.3em' : 0 }}>{title}</h1>
      {lede ? <p className="dtj-lede">{lede}</p> : null}
    </header>
  );
}
