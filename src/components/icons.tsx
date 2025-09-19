export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 4.162 2.537 7.733 6.096 9.15" />
      <path d="m9 12-2-2" />
      <path d="m13 12-2-2" />
      <path d="m17 12-2-2" />
      <path d="m9 16-2-2" />
      <path d="m13 16-2-2" />
    </svg>
  );
}
