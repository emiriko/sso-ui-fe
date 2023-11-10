import Link from 'next/link';

export const Button: React.FC<{
  children: React.ReactNode;
  link?: string;
  logout?: boolean;
  cb?: () => void;
}> = ({ children, link = '', logout = false, cb }) =>
  link ? (
    <Link
      className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold py-3 px-6 rounded-lg w-fit flex justify-center items-center dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 m-auto gap-2"
      href={link}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold py-3 px-6 rounded-lg w-fit flex justify-center items-center ${
        !logout ? 'dark:bg-sky-500' : 'dark:bg-rose-500'
      } dark:highlight-white/20 m-auto gap-2 w-full max-w-[175px] ${
        !logout
          ? 'cursor-default dark:hover:bg-sky-400'
          : 'dark:hover:bg-rose-400 '
      }`}
      onClick={() => {
        if (cb) cb();
      }}
    >
      {children}
    </button>
  );
