import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export const Button = ({ children, ...rest }: Props) => <button {...rest}>{children}</button>
