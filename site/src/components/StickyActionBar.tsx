'use client'

import { Phone, Calendar, FileText } from 'lucide-react'
import Link from 'next/link'
import { cn, formatPhoneLink } from '@/lib/utils'

interface StickyActionBarProps {
  phone: string
}

export function StickyActionBar({ phone }: StickyActionBarProps) {
  const actions = [
    {
      label: 'Appeler',
      icon: Phone,
      href: `tel:${formatPhoneLink(phone)}`,
      className: 'bg-primary text-primary-foreground',
    },
    {
      label: 'RDV',
      icon: Calendar,
      href: '/rendez-vous',
      className: 'bg-white text-primary border border-primary',
    },
    {
      label: 'Ordonnance',
      icon: FileText,
      href: '/ordonnance',
      className: 'bg-white text-primary border border-primary',
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-border shadow-lg md:hidden"
      aria-label="Actions rapides"
    >
      <div className="flex items-stretch justify-around py-2 px-2 gap-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg font-medium text-sm transition-all active:scale-95',
              action.className
            )}
          >
            <action.icon className="h-5 w-5" aria-hidden="true" />
            <span>{action.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
