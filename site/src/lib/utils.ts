import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formate un numéro de téléphone pour l'affichage
 */
export function formatPhone(phone: string): string {
  // +33 4 94 51 58 02 -> 04 94 51 58 02
  return phone.replace(/^\+33\s?/, '0').replace(/(\d{2})(?=\d)/g, '$1 ')
}

/**
 * Formate un numéro de téléphone pour le lien tel:
 */
export function formatPhoneLink(phone: string): string {
  return phone.replace(/\s/g, '')
}

/**
 * Vérifie si la pharmacie est ouverte maintenant
 */
export function isOpenNow(hours: Record<string, { opens: string; closes: string }[]>): {
  isOpen: boolean
  message: string
  nextChange: string | null
} {
  const now = new Date()
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const currentDay = dayNames[now.getDay()]
  const currentTime = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Paris',
  })

  const todayHours = hours[currentDay] || []

  if (todayHours.length === 0) {
    // Fermé aujourd'hui, chercher prochain jour d'ouverture
    return {
      isOpen: false,
      message: 'Fermé',
      nextChange: getNextOpeningDay(hours, now),
    }
  }

  for (const slot of todayHours) {
    if (currentTime >= slot.opens && currentTime < slot.closes) {
      return {
        isOpen: true,
        message: 'Ouvert',
        nextChange: `Ferme à ${slot.closes}`,
      }
    }

    if (currentTime < slot.opens) {
      return {
        isOpen: false,
        message: 'Fermé',
        nextChange: `Ouvre à ${slot.opens}`,
      }
    }
  }

  // Après la fermeture
  return {
    isOpen: false,
    message: 'Fermé',
    nextChange: getNextOpeningDay(hours, now),
  }
}

function getNextOpeningDay(
  hours: Record<string, { opens: string; closes: string }[]>,
  now: Date
): string | null {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const dayLabels = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (now.getDay() + i) % 7
    const nextDay = dayNames[nextDayIndex]
    const nextDayHours = hours[nextDay] || []

    if (nextDayHours.length > 0) {
      const dayLabel = i === 1 ? 'demain' : dayLabels[nextDayIndex]
      return `Ouvre ${dayLabel} à ${nextDayHours[0].opens}`
    }
  }

  return null
}

/**
 * Génère un slug à partir d'un texte
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
