export const Code: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <code className="font-mono font-bold text-sky-500 dark:text-sky-400">
    {children}
  </code>
);
