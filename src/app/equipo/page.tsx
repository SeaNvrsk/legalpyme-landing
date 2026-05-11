import MarketingSiteNav from "@/components/MarketingSiteNav";
import TeamCarousel from "@/components/TeamCarousel";
import SiteFooter from "@/components/SiteFooter";

export default function EquipoPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] selection:bg-neutral-200">
      <MarketingSiteNav />
      <TeamCarousel variant="page" />
      <SiteFooter />
    </div>
  );
}
