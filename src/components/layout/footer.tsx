export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2 h-20 py-6 text-center md:h-24 md:flex-row md:py-0">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Active Hub. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
