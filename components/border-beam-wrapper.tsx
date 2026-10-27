'use client'

import { BorderBeam } from 'border-beam'
import type { ComponentProps, ReactNode } from 'react'

type Props = Omit<ComponentProps<typeof BorderBeam>, 'children'> & { children: ReactNode }

export function BorderBeamWrapper({ children, ...props }: Props) {
  return <BorderBeam {...props}>{children}</BorderBeam>
}
