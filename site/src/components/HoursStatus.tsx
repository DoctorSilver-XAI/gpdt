'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { isOpenNow } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface HoursStatusProps {
  hours: Record<string, { opens: string; closes: string }[]>
  className?: string
  showDetails?: boolean
}

export function HoursStatus({ hours, className, showDetails = true }: HoursStatusProps) {
  const [status, setStatus] = useState<{
    isOpen: boolean
    message: string
    nextChange: string | null
  }>({ isOpen: false, message: 'Vérification...', nextChange: null })

  useEffect(() => {
    const updateStatus = () => {
      setStatus(isOpenNow(hours))
    }

    updateStatus()
    // Mettre à jour toutes les minutes
    const interval = setInterval(updateStatus, 60000)

    return () => clearInterval(interval)
  }, [hours])

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
        status.isOpen
          ? 'bg-green-100 text-green-800'
          : 'bg-amber-100 text-amber-800',
        className
      )}
    >
      <Clock className="h-4 w-4" aria-hidden="true" />
      <span className="font-semibold">{status.message}</span>
      {showDetails && status.nextChange && (
        <>
          <span className="text-current/60">·</span>
          <span className="text-current/80">{status.nextChange}</span>
        </>
      )}
    </div>
  )
}
