import { ReactNode } from 'react'

export default function Test({ children }: { children: ReactNode }) {
  return <div className="border">{children}</div>
}
