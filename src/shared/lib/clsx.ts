export const clsx = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(' ')
