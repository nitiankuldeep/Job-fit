"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { ReactNode, Suspense } from "react"

export function AppSidebarClient({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <div className="p-2 border-b flex items-center gap-1">
          <Suspense fallback={<div>Loading trigger...</div>}>
            <SidebarTrigger />
          </Suspense>
          <span className="text-xl font-bold whitespace-nowrap">Job-Fit</span>
        </div>
        <div className="flex-1 flex">
          <Suspense fallback={<div>Loading sidebar...</div>}>
            {children}
          </Suspense>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Loading layout...</div>}>
      {children}
    </Suspense>
  )
}
