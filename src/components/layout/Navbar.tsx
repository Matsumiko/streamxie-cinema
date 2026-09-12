import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BookmarkSimple, CaretDown, FilmStrip, House, List as ListIcon, MagnifyingGlass, UserCircle, X } from "@phosphor-icons/react";
import { getAvatar, type AvatarOption } from "@/lib/avatarStore";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { BrandLogo } from "@/components/common/BrandLogo";
import { useAuth } from "@/hooks/use-auth";
import { AVATAR_CHANGE_EVENT, LEGACY_AVATAR_CHANGE_EVENT } from "@/lib/brand";

type NavbarProps = { onOpenCommand: (trigger?: HTMLElement | null) => void };
const browseCategories = [
  { label: "Movies", href: "/browse?category=Movies" },
  { label: "Series", href: "/browse?category=Series" },
  { label: "Anime", href: "/browse?category=Anime" },
  { label: "Drama", href: "/browse?category=Drama" },
  { label: "Variety", href: "/browse?category=Variety" },
];

export const Navbar = ({ onOpenCommand }: NavbarProps) => {
  const { isAnonymous } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [browseDropdownOpen, setBrowseDropdownOpen] = useState(false);
  const [avatar, setAvatarState] = useState<AvatarOption>(getAvatar());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isBrowseActive = location.pathname === "/browse";
  const isTransparent = isHome && !scrolled;
  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    if (location.pathname !== path) return false;
    if (!query) return true;
    const expected = new URLSearchParams(query);
    const actual = new URLSearchParams(location.search);
    return [...expected.entries()].every(([key, value]) => actual.get(key) === value);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
    setBrowseDropdownOpen(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    const handler = () => setAvatarState(getAvatar());
    window.addEventListener(AVATAR_CHANGE_EVENT, handler);
    window.addEventListener(LEGACY_AVATAR_CHANGE_EVENT, handler);
    return () => {
      window.removeEventListener(AVATAR_CHANGE_EVENT, handler);
      window.removeEventListener(LEGACY_AVATAR_CHANGE_EVENT, handler);
    };
  }, []);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setBrowseDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isTransparent ? "bg-transparent" : "border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md"}`}>
    <nav className="mx-auto flex max-w-container items-center justify-between gap-4 px-6 py-3 md:px-12 lg:gap-8">
      <Link to="/" aria-label="Go to home" className="shrink-0 text-foreground transition-colors hover:text-primary"><BrandLogo size="sm" textClassName="hidden sm:block" /></Link>
      <div className="hidden flex-1 items-center justify-center lg:flex"><NavigationMenu><NavigationMenuList className="flex items-center gap-1">
        <NavigationMenuItem><NavLink to="/" end className={({ isActive: active }) => `relative flex h-10 items-center rounded-lg px-3.5 text-sm font-medium ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>Home</NavLink></NavigationMenuItem>
        <NavigationMenuItem><NavLink to="/my-list" className={({ isActive: active }) => `relative flex h-10 items-center rounded-lg px-3.5 text-sm font-medium ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>My List</NavLink></NavigationMenuItem>
        <NavigationMenuItem><div ref={dropdownRef} className="relative"><button type="button" onClick={() => setBrowseDropdownOpen((value) => !value)} className={`relative flex h-10 items-center gap-1.5 rounded-lg px-3.5 text-sm font-medium ${isBrowseActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>Browse <CaretDown size={12} weight="bold" /></button>{browseDropdownOpen ? <div className="absolute left-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-card/95 py-1.5 shadow-2xl backdrop-blur-xl">{browseCategories.map((category) => <Link key={category.label} to={category.href} className={`block px-4 py-2.5 text-sm ${isActive(category.href) ? "bg-primary/10 text-primary" : "text-foreground hover:text-primary"}`}>{category.label}</Link>)}</div> : null}</div></NavigationMenuItem>
      </NavigationMenuList></NavigationMenu></div>
      <div className="hidden items-center gap-2 md:flex"><button type="button" aria-label="Open search" onClick={(event) => onOpenCommand(event.currentTarget)} className="flex h-10 min-w-[180px] items-center gap-2 rounded-lg border border-border bg-card/50 px-3.5 text-xs text-muted-foreground hover:border-primary/60"><MagnifyingGlass size={15} weight="bold" />Search titles...</button>{isAnonymous ? <Link to="/login" className="flex h-10 items-center rounded-lg border border-primary/50 bg-primary/10 px-3 text-xs font-semibold text-primary">Sign in</Link> : <button type="button" aria-label="Go to profile" onClick={() => navigate("/profile")} className="h-10 w-10 overflow-hidden rounded-full bg-card ring-1 ring-border"><img src={avatar.image} alt={`Avatar ${avatar.label}`} className="h-full w-full object-cover" /></button>}</div>
      <div className="flex items-center gap-2 md:hidden"><button type="button" aria-label="Search" onClick={(event) => onOpenCommand(event.currentTarget)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60"><MagnifyingGlass size={17} /></button><button type="button" aria-label="Menu" onClick={() => setMobileMenuOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60">{mobileMenuOpen ? <X size={17} /> : <ListIcon size={17} />}</button></div>
    </nav>
    {mobileMenuOpen ? <div className="border-t border-border bg-background/98 md:hidden"><div className="space-y-0.5 px-4 py-4"><NavLink to="/" end className="block min-h-[44px] rounded-lg px-4 py-2.5 text-sm">Home</NavLink><NavLink to="/my-list" className="block min-h-[44px] rounded-lg px-4 py-2.5 text-sm">My List</NavLink><p className="px-4 pb-1.5 pt-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Browse</p>{browseCategories.map((category) => <NavLink key={category.label} to={category.href} className="block min-h-[44px] rounded-lg px-4 py-2.5 text-sm">{category.label}</NavLink>)}<div className="my-2 border-t border-border" />{isAnonymous ? <Link to="/login" className="flex min-h-[44px] items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary"><UserCircle size={17} />Sign in</Link> : <NavLink to="/profile" className="flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2.5 text-sm"><UserCircle size={17} />Profile</NavLink>}</div></div> : null}
  </header>;
};

export const MobileNavMenu = () => {
  const location = useLocation();
  const items = [
    { label: "Home", href: "/", icon: House },
    { label: "Browse", href: "/browse", icon: FilmStrip },
    { label: "Search", href: "/search", icon: MagnifyingGlass },
    { label: "My List", href: "/my-list", icon: BookmarkSimple },
    { label: "Profile", href: "/profile", icon: UserCircle },
  ];
  return <nav aria-label="Navigasi bawah" className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 md:hidden"><div className="grid grid-cols-5">{items.map((item) => { const Icon = item.icon; const active = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href)); return <Link key={item.label} to={item.href} aria-label={item.label} className={`flex min-h-[60px] flex-col items-center justify-center gap-1 text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}><Icon size={22} weight={active ? "fill" : "regular"} /><span>{item.label}</span></Link>; })}</div></nav>;
};
