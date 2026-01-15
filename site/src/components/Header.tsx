'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Calendar, ChevronRight } from 'lucide-react'
import { cn, assetPath } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/services', label: 'Services' },
  { href: '/equipe', label: 'Équipe' },
  { href: '/la-pharmacie', label: 'La pharmacie' },
  { href: '/contact', label: 'Contact' },
]

interface HeaderProps {
  pharmacyName: string
}

export function Header({ pharmacyName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-transparent'
      )}
    >
      <div className="section-container">
        <div className={cn(
          'flex items-center justify-between transition-all duration-300',
          isScrolled ? 'h-16' : 'h-20'
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 min-h-0 min-w-0 group">
            <div className="relative">
              <Image
                src={assetPath('/brand/logo.png')}
                alt=""
                width={40}
                height={40}
                className={cn(
                  'transition-all duration-300',
                  isScrolled ? 'h-9 w-auto' : 'h-10 w-auto'
                )}
              />
            </div>
            <span className={cn(
              'font-semibold hidden sm:block transition-all duration-300 group-hover:text-primary',
              isScrolled ? 'text-base' : 'text-lg'
            )}>
              {pharmacyName}
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-0 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-1/2 transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/rendez-vous"
              className="ml-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 group"
            >
              <Calendar className="h-4 w-4" />
              Prendre RDV
              <ChevronRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </Link>
          </nav>

          {/* Menu burger mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              'md:hidden p-2.5 -mr-2 rounded-full transition-colors duration-300',
              isMenuOpen ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
            )}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-6">
              <Menu className={cn(
                'h-6 w-6 absolute inset-0 transition-all duration-300',
                isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
              )} />
              <X className={cn(
                'h-6 w-6 absolute inset-0 transition-all duration-300',
                isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* Navigation mobile - panneau amélioré */}
      <nav
        className={cn(
          'md:hidden bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-300 border-t border-border/50',
          isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-label="Navigation mobile"
      >
        <div className="section-container py-6 space-y-1">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between py-4 px-4 -mx-4 text-base font-medium text-foreground hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.label}
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-border/50">
            <Link
              href="/rendez-vous"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg shadow-primary/20"
            >
              <Calendar className="h-5 w-5" />
              Prendre RDV
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
