import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
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

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string()
    .min(10, "WhatsApp number must be at least 10 characters")
    .regex(/^[+0-9\s-]+$/, "Invalid format. Use numbers, spaces, or dashes (e.g. +62 812...)"),
  date: z.date({
    required_error: "Please select a date",
  }).refine((date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }, "Travel date cannot be in the past"),
  participants: z.string().optional(),
  duration: z.string().optional(),
  notes: z.string().optional(),
})

export default function BookingForm({ type, itemName, onSuccess }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()

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
    },
  })

  const selectedDate = watch("date")

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Construct WhatsApp message
    const phoneNumber = "6285737872793" // Business phone number
    const dateStr = data.date ? format(data.date, "PP") : "N/A"
    const participantsOrDuration = type === "package" 
      ? `${data.participants} Persons` 
      : `${data.duration}`

    const message = `*New Booking Inquiry*%0A` +
      `--------------------------%0A` +
      `*Type:* ${type === "package" ? "Tour Package" : "Motorbike Rental"}%0A` +
      `*Item:* ${itemName}%0A` +
      `*Name:* ${data.name}%0A` +
      `*Email:* ${data.email}%0A` +
      `*WhatsApp:* ${data.whatsapp}%0A` +
      `*Date:* ${dateStr}%0A` +
      `*${type === "package" ? "Participants" : "Duration"}:* ${participantsOrDuration}%0A` +
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
        itemName,
        type
      } 
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name")}
            className={cn(errors.name && "border-destructive")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={cn(errors.email && "border-destructive")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="whatsapp"
            placeholder="+62 812-3456-7890"
            {...register("whatsapp")}
            className={cn(errors.whatsapp && "border-destructive")}
          />
          {errors.whatsapp && (
            <p className="text-xs text-destructive">{errors.whatsapp.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Travel Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                  errors.date && "border-destructive"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setValue("date", date)}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-xs text-destructive">{errors.date.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {type === "package" ? (
          <div className="space-y-2">
            <Label htmlFor="participants">Number of Participants</Label>
            <Select 
              onValueChange={(value) => setValue("participants", value)}
              defaultValue="1"
            >
              <SelectTrigger id="participants">
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Person" : "Persons"}
                  </SelectItem>
                ))}
                <SelectItem value="10+">More than 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="duration">Rental Duration</Label>
            <Select 
              onValueChange={(value) => setValue("duration", value)}
              defaultValue="1 Day"
            >
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {["1 Day", "2 Days", "3 Days", "4 Days", "5 Days", "1 Week"].map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="item">Selected {type === "package" ? "Package" : "Motorbike"}</Label>
          <Input
            id="item"
            value={itemName}
            disabled
            className="bg-slate-50 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Special Requests / Notes</Label>
        <Textarea
          id="notes"
          placeholder="Any special requirements? (e.g. dietary restrictions, pick-up location)"
          {...register("notes")}
          className="min-h-[100px]"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-6 rounded-2xl shadow-lg shadow-brand-blue/20 transition-all active:scale-[0.98]"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Proceed to Confirmation`
        )}
      </Button>
    </form>
  )
}
