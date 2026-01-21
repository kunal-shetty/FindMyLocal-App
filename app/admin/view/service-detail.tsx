"use client";

import { useSearchParams, notFound, useRouter } from "next/navigation";
import { services } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Navigation,
  Star,
  User,
  CheckCircle,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check, X, Trash2, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useServices } from "@/context/service-context";

export default function AdminServiceDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    updateServiceStatus,
    deleteService,
    services: contextServices,
  } = useServices();
  const id = searchParams.get("id");

  if (!id) notFound();

  const service = contextServices.find((s) => s.id === id);
  if (!service) notFound();

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const [activeImage, setActiveImage] = useState(service.images[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    action: "",
    title: "",
    description: "",
  });

  const handleApprove = () => {
    setAlertDialog({
      isOpen: true,
      action: "approve",
      title: "Approve Service",
      description:
        "Are you sure you want to approve this service? This action cannot be undone.",
    });
  };

  const handleReject = () => {
    setAlertDialog({
      isOpen: true,
      action: "reject",
      title: "Reject Service",
      description:
        "Are you sure you want to reject this service? The provider will be notified.",
    });
  };

  const handleDelete = () => {
    setAlertDialog({
      isOpen: true,
      action: "delete",
      title: "Delete Service",
      description:
        "Are you sure you want to delete this service? This action cannot be undone.",
    });
  };

  const handleVerify = () => {
    setAlertDialog({
      isOpen: true,
      action: "verify",
      title: "Verify Service",
      description:
        "Are you sure you want to verify this service? This will mark it as verified.",
    });
  };

  const confirmAction = () => {
    switch (alertDialog.action) {
      case "approve":
        updateServiceStatus(service.id, "Approved");
        toast({
          title: "Success",
          description: "Service approved successfully",
        });
        break;
      case "reject":
        updateServiceStatus(service.id, "Rejected");
        toast({
          title: "Success",
          description: "Service rejected successfully",
        });
        break;
      case "delete":
        deleteService(service.id);
        toast({
          title: "Success",
          description: "Service deleted successfully",
        });
        setTimeout(() => router.push("/admin"), 500);
        break;
      case "verify":
        toast({
          title: "Success",
          description: "Service verified successfully",
        });
        break;
    }
    setAlertDialog({ isOpen: false, action: "", title: "", description: "" });
  };

  return (
    <>
      <div className="container max-w-7xl py-10 space-y-10">
        {/* ===== TITLE WITH ACTION BUTTONS ===== */}
        <section className="flex items-start justify-between gap-4">
          <div className="space-y-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{service.name}</h1>
            <p className="text-muted-foreground">{service.category}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {service.location}
              </span>
              <span className="flex items-center gap-1">
                <Navigation className="h-4 w-4" />
                {service.distance} km away
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                {service.rating}
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              onClick={handleVerify}
              size="sm"
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Verify
            </Button>
            <Button
              onClick={handleApprove}
              size="sm"
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={handleReject}
              size="sm"
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={handleDelete}
              size="sm"
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </section>

        {/* ===== IMAGE GALLERY ===== */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-hidden rounded-2xl border">
            <img
              src={activeImage}
              alt={service.name}
              className="w-full h-[260px] sm:h-[360px] md:h-[420px] object-cover"
            />
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
            {service.images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(img)}
                className={`relative overflow-hidden rounded-xl border aspect-[6/3] ${
                  activeImage === img
                    ? "ring-2 ring-primary border-primary"
                    : "hover:border-primary/50"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <section className="grid gap-10 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-semibold text-lg">About this service</h3>
              <p className="text-muted-foreground mt-2">
                {service.description}
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-2">Pricing</h3>
              {service.pricing.type === "fixed" ? (
                <p className="text-xl font-medium">
                  ₹{service.pricing.amount}
                  <span className="text-sm text-muted-foreground ml-1">
                    {service.pricing.unit}
                  </span>
                </p>
              ) : (
                <p className="text-xl font-medium">
                  ₹{service.pricing.min} – ₹{service.pricing.max}
                  <span className="text-sm text-muted-foreground ml-1">
                    {service.pricing.unit}
                  </span>
                </p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">What’s included</h3>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                {service.inclusions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <aside className="rounded-2xl border bg-card p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">{service.provider.name}</p>
                <p className="text-sm text-muted-foreground">
                  {service.provider.experience}+ years experience
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">{service.provider.completedJobs}+</p>
                <p className="text-muted-foreground">Jobs done</p>
              </div>
              <div>
                <p className="font-medium">{service.rating} ★</p>
                <p className="text-muted-foreground">Rating</p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Languages:{" "}
              <span className="text-foreground">
                {service.provider.languages.join(", ")}
              </span>
            </div>

      

            {/* Contact Info */}
            <div className="pt-4 border-t space-y-3">
              <div className="text-sm">
                <p className="text-muted-foreground mb-2">Contact Provider</p>
                <p className="font-medium">{service.provider.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="w-full border-green-500/30 hover:bg-green-500/10"
                  asChild
                >
                  <a
                    href={`https://wa.me/${service.provider.whatsapp.replace(/[^0-9]/g, "")}?text=Hi ${encodeURIComponent(service.provider.name)}, I'm interested in your ${encodeURIComponent(service.name)} service.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={`tel:${service.provider.phone.replace(/[^0-9+]/g, "")}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </a>
                </Button>
              </div>
            </div>

   
          </aside>
        </section>
      </div>


    </>
  );
}
