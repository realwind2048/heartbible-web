export default function ShareLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="h-full w-full">{children}</section>
  }