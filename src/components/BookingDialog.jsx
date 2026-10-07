import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next"
import { Compass, Key } from "lucide-react"
import BookingForm from "./BookingForm"

export default function BookingDialog({ children, type = "package", itemName }) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const isRental = type === "rental"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-[560px] max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 bg-white outline-none">
        <DialogHeader className="pr-8 text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[11px] font-extrabold uppercase tracking-wider w-fit">
            {isRental ? <Key className="w-3.5 h-3.5" /> : <Compass className="w-3.5 h-3.5" />}
            <span>{isRental ? t('tab_scooter_rental') : t('tab_car_package')}</span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-display font-black text-brand-navy tracking-tight">
            {isRental 
              ? t('dialog_rental_title') 
              : t('dialog_package_title')}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-normal">
            {t('dialog_desc')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 sm:py-3">
          <BookingForm 
            type={type} 
            itemName={itemName} 
            onSuccess={() => setOpen(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
