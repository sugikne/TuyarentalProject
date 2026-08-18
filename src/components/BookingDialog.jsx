import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import BookingForm from "./BookingForm"

export default function BookingDialog({ children, type, itemName }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-black text-brand-navy">
            Book Your {type === "package" ? "Trip" : "Rental"}
          </DialogTitle>
          <DialogDescription>
            Fill in your details below to secure your adventure in Nusa Penida.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <BookingForm type={type} itemName={itemName} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
