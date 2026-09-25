export async function generateStaticParams() {
  const schemes = ['2020', '2025'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return schemes.flatMap((scheme) => semesters.map((sem) => ({ scheme, sem })));
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
