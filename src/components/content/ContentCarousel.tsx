import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/common/SectionHeader";

type ContentCarouselProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  viewAllHref?: string;
};

export const ContentCarousel = ({
  title,
  subtitle,
  children,
  viewAllHref = "/browse",
}: ContentCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    setCanScrollLeft(element.scrollLeft > 1);
    setCanScrollRight(element.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    const element = scrollRef.current;
    if (!element) return;
    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [children, updateScrollState]);
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = Math.max(scrollRef.current.clientWidth * 0.8, 320);
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8 md:py-10">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Scroll left"
              aria-disabled={!canScrollLeft}
              disabled={!canScrollLeft}
              onClick={() => scroll("left")}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              aria-disabled={!canScrollRight}
              disabled={!canScrollRight}
              onClick={() => scroll("right")}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
            >
              <CaretRight size={16} weight="bold" />
            </button>
            <Link
              to={viewAllHref}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              See all
              <CaretRight size={14} weight="bold" />
            </Link>
          </div>
        }
      />
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-3 hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {children}
      </div>
    </section>
  );
};
