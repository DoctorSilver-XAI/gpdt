import { AlertTriangle } from 'lucide-react'

export function EmergencyBanner() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-amber-800">En cas d&apos;urgence médicale</p>
          <p className="text-amber-700 mt-1">
            Appelez le <strong>15</strong> (SAMU) ou le <strong>112</strong> (urgences européennes).
            <br />
            Ce site informe et oriente, il ne remplace pas un avis médical.
          </p>
        </div>
      </div>
    </div>
  )
}
