export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-4 md:order-2">
          <p className="text-sm leading-5 text-muted-foreground">
            Une initiative de la DGCBF
          </p>
          <p className="text-sm leading-5 text-muted-foreground">
            Contact : <a href="mailto:support@okanisurvey.com" className="text-primary hover:underline">support@okanisurvey.com</a>
          </p>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-sm leading-5 text-muted-foreground">
            &copy; 2025 Okani Survey. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

