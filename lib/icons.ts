import { Wrench, Zap, GraduationCap, Car, Hammer, Sparkles, Paintbrush, Leaf, type LucideIcon } from "lucide-react"

export function getCategoryIcon(category: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    Plumber: Wrench,
    Electrician: Zap,
    Tutor: GraduationCap,
    Mechanic: Car,
    Carpenter: Hammer,
    Cleaner: Sparkles,
    Painter: Paintbrush,
    Gardener: Leaf,
  }

  return iconMap[category] || Wrench
}
