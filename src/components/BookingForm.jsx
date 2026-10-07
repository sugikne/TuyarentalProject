import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { 
  Calendar as CalendarIcon, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Users, 
  Clock, 
  FileText, 
  Car, 
  Bike, 
  Key, 
  ShieldCheck, 
  Send,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { packages, motorbikes } from "@/constants"

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string()
    .min(10, "WhatsApp number must be at least 10 characters")
    .regex(/^[+0-9\s-]+$/, "Invalid format. Use numbers (e.g. +62 812...)"),
  date: z.date({
    required_error: "Please select a date",
  }).refine((date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }, "Travel date cannot be in the past"),
  selectedItem: z.string().optional(),
  participants: z.string().optional(),
  duration: z.string().optional(),
  notes: z.string().optional(),
})

export default function BookingForm({ type = "package", itemName = "", onSuccess }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedService, setSelectedService] = React.useState(itemName)
  const [serviceType, setServiceType] = React.useState(type)
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en'

  // Update internal selectedService when prop changes
  React.useEffect(() => {
    if (itemName) {
      setSelectedService(itemName)
      setServiceType(type)
    }
  }, [itemName, type])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      participants: "1",
      duration: "1 Day",
      selectedItem: itemName || (packages[0]?.name || ""),
      notes: "",
    },
  })

  const selectedDate = watch("date")

  const handleServiceSelect = (val) => {
    setSelectedService(val)
    setValue("selectedItem", val)
    // Check if the selected service is a motorbike rental
    const isBike = motorbikes.some(b => b.name === val)
    setServiceType(isBike ? "rental" : "package")
  }

  const isCurrentRental = serviceType === "rental"

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    const finalItemName = selectedService || itemName || data.selectedItem || "Nusa Penida Tour"
    const phoneNumber = "6285737872793" // Business phone number
    const dateStr = data.date ? format(data.date, "PP") : "N/A"
    const participantsOrDuration = isCurrentRental 
      ? `${data.duration || '1 Day'}`
      : `${data.participants || '1'} Persons`

    const message = `*New Booking Inquiry*%0A` +
      `--------------------------%0A` +
      `*Type:* ${isCurrentRental ? "Motorbike Rental" : "Tour Package"}%0A` +
      `*Item:* ${finalItemName}%0A` +
      `*Name:* ${data.name}%0A` +
      `*Email:* ${data.email}%0A` +
      `*WhatsApp:* ${data.whatsapp}%0A` +
      `*Date:* ${dateStr}%0A` +
      `*${isCurrentRental ? "Duration" : "Participants"}:* ${participantsOrDuration}%0A` +
      `*Notes:* ${data.notes || "-"}%0A` +
      `--------------------------%0A` +
      `Sent from Nusapenida Motor Trip Website`

    const waUrl = `https://wa.me/${phoneNumber}?text=${message}`
    
    setIsLoading(false)
    
    // Open WhatsApp in new tab
    window.open(waUrl, "_blank")
    
    if (onSuccess) {
      onSuccess()
    }

    navigate("/booking-success", { 
      state: { 
        name: data.name,
        date: data.date,
        itemName: finalItemName,
        type: isCurrentRental ? "rental" : "package"
      } 
    })
  }

  // Find info of current service
  const currentPackageObj = packages.find(p => p.name === selectedService)
  const currentBikeObj = motorbikes.find(b => b.name === selectedService)
  const isCarService = currentPackageObj?.cardType === 'car'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 text-left">
      {/* Service Selection / Banner */}
      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          {isCurrentRental ? <Key className="w-3.5 h-3.5 text-sky-600" /> : isCarService ? <Car className="w-3.5 h-3.5 text-emerald-600" /> : <Bike className="w-3.5 h-3.5 text-amber-500" />}
          <span>{t('selected_service')}</span>
        </Label>

        {selectedService ? (
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isCurrentRental ? 'bg-sky-100 text-sky-700' : isCarService ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {isCurrentRental ? <Key className="w-4 h-4" /> : isCarService ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs sm:text-sm text-brand-navy truncate">
                  {selectedService}
                </p>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block">
                  {isCurrentRental ? t('daily_scooter_rental') : t('nusa_penida_tour')}
                </span>
              </div>
            </div>
            
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{t('ready_badge')}</span>
            </span>
          </div>
        ) : (
          <Select onValueChange={handleServiceSelect} defaultValue={packages[0]?.name}>
            <SelectTrigger className="w-full h-11 sm:h-10 text-[15px] sm:text-sm rounded-xl px-3.5 bg-slate-50 border-slate-200 focus:bg-white focus:border-brand-blue flex items-center justify-between">
              <SelectValue placeholder={t('select_service_placeholder')} />
            </SelectTrigger>
            <SelectContent className="max-h-60 rounded-xl bg-white border border-slate-200">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t('tour_packages_opt')}
              </div>
              {packages.map(p => (
                <SelectItem key={p.id} value={p.name} className="text-xs sm:text-sm font-medium">
                  {currentLang === 'id' && p.name_id ? p.name_id : p.name}
                </SelectItem>
              ))}
              <div className="px-2 py-1 pt-2 border-t border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t('daily_rentals_opt')}
              </div>
              {motorbikes.map(b => (
                <SelectItem key={b.id} value={b.name} className="text-xs sm:text-sm font-medium">
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Row 1: Full Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>{t('full_name')}</span>
          </Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="John Doe"
            {...register("name")}
            className={cn(
              "h-11 sm:h-10 text-[15px] sm:text-sm rounded-xl px-3.5 bg-slate-50 border-slate-200 focus:bg-white focus:border-brand-blue transition-colors",
              errors.name && "border-destructive ring-1 ring-destructive/30"
            )}
          />
          {errors.name && (
            <p className="text-[11px] text-destructive font-medium">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>{t('email_address')}</span>
          </Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="john@example.com"
            {...register("email")}
            className={cn(
              "h-11 sm:h-10 text-[15px] sm:text-sm rounded-xl px-3.5 bg-slate-50 border-slate-200 focus:bg-white focus:border-brand-blue transition-colors",
              errors.email && "border-destructive ring-1 ring-destructive/30"
            )}
          />
          {errors.email && (
            <p className="text-[11px] text-destructive font-medium">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: WhatsApp Number & Travel Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="whatsapp" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>{t('whatsapp_number')}</span>
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+62 812-3456-7890"
            {...register("whatsapp")}
            className={cn(
              "h-11 sm:h-10 text-[15px] sm:text-sm rounded-xl px-3.5 bg-slate-50 border-slate-200 focus:bg-white focus:border-brand-blue transition-colors",
              errors.whatsapp && "border-destructive ring-1 ring-destructive/30"
            )}
          />
          {errors.whatsapp && (
            <p className="text-[11px] text-destructive font-medium">{errors.whatsapp.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>{isCurrentRental ? t('rental_date') : t('travel_date')}</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full h-11 sm:h-10 text-[15px] sm:text-sm rounded-xl justify-start px-3.5 bg-slate-50 border-slate-200 text-left font-normal focus:bg-white focus:border-brand-blue hover:bg-slate-100/80 transition-colors",
                  !selectedDate && "text-muted-foreground",
                  errors.date && "border-destructive ring-1 ring-destructive/30"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-brand-blue shrink-0" />
                {selectedDate ? (
                  <span className="font-semibold text-brand-navy">{format(selectedDate, "PPP")}</span>
                ) : (
                  <span>{t('pick_date')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 rounded-2xl border border-slate-200 bg-white" align="center" side="bottom">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setValue("date", date)}
                disabled={(date) => {
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return date < today
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-[11px] text-destructive font-medium">{errors.date.message}</p>
          )}
        </div>
      </div>

      {/* Row 3: Participants (Package) OR Rental Duration (Rental) */}
      <div className="space-y-1.5">
        {isCurrentRental ? (
          <div>
            <Label htmlFor="duration" className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('rental_duration')}</span>
            </Label>
            <Select 
              onValueChange={(value) => setValue("duration", value)}
              defaultValue="1 Day"
            >
              <SelectTrigger id="duration" className="w-full h-11 sm:h-10 text-[15px] sm:text-sm rounded-xl px-3.5 bg-slate-50 border-slate-200 focus:bg-white focus:border-brand-blue flex items-center justify-between">
                <SelectValue placeholder={t('select_duration')} />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border border-slate-200">
                {[
                  { val: "1 Day", idVal: "1 Hari" },
                  { val: "2 Days", idVal: "2 Hari" },
                  { val: "3 Days", idVal: "3 Hari" },
                  { val: "4 Days", idVal: "4 Hari" },
                  { val: "5 Days", idVal: "5 Hari" },
                  { val: "1 Week", idVal: "1 Minggu" },
                  { val: "2 Weeks", idVal: "2 Minggu" },
                  { val: "1 Month", idVal: "1 Bulan" }
                ].map((d) => (
                  <SelectItem key={d.val} value={d.val} className="text-xs sm:text-sm font-medium">
                    {currentLang === 'id' ? d.idVal : d.val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div>
            <Label htmlFor="participants" className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('number_participants')}</span>
            </Label>
            <Select 
              onValueChange={(value) => setValue("participants", value)}
              defaultValue="1"
            >
              <SelectTrigger id="participants" className="w-full h-11 sm:h-10 text-[15px] sm:text-sm rounded-xl px-3.5 bg-slate-50 border-slate-200 focus:bg-white focus:border-brand-blue flex items-center justify-between">
                <SelectValue placeholder={t('select_participants')} />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border border-slate-200">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()} className="text-xs sm:text-sm font-medium">
                    {num} {num === 1 ? t('person') : t('persons')}
                  </SelectItem>
                ))}
                <SelectItem value="10+" className="text-xs sm:text-sm font-medium">
                  {t('group_participants')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Row 4: Special Requests / Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="notes" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>{t('special_requests')}</span>
        </Label>
        <Textarea
          id="notes"
          placeholder={t('notes_placeholder')}
          {...register("notes")}
          className="min-h-[80px] sm:min-h-[90px] text-[15px] sm:text-sm rounded-xl p-3 bg-slate-50 border-slate-200 focus:bg-white focus:border-brand-blue resize-none leading-relaxed"
        />
      </div>

      {/* Submit Button (No shadow) */}
      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 sm:h-13 py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base text-white bg-brand-blue hover:bg-brand-blue/90 border border-transparent active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin shrink-0" />
              <span>{t('processing')}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 shrink-0" />
              <span>{t('proceed_wa')}</span>
            </>
          )}
        </Button>
      </div>

      {/* Trust & Guarantee Badge */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-500 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>
          {t('booking_guarantee')}
        </span>
      </div>
    </form>
  )
}
