import Link from 'next/link';

export const Button: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <Link
    className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold py-3 px-6 rounded-lg w-fit flex justify-center items-center dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 m-auto gap-2"
    href={`${process.env.NEXT_PUBLIC_SSO_URL}/login?service=${process.env.NEXT_PUBLIC_SERVICE_URL}/`}
  >
    {children}
  </Link>
);
