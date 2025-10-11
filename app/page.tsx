import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-muted [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-muted/20">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-12 pt-10 sm:pb-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20">
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Initiative Gouvernementale Officielle
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Sondage de Satisfaction
              <span className="block text-primary mt-2">
                Service Public Foncier
              </span>
            </h1>

            <p className="mt-8 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
              Bienvenue sur la plateforme dédiée au sondage sur la satisfaction
              des usagers du service public foncier, confiée à l'ANUTTC.
            </p>

            <div className="mt-12 flex flex-col items-center gap-6">
              <Button
                asChild
                size="lg"
                className="shadow-lg px-12 py-6 text-lg"
              >
                <Link href="/stage-selection">Commencer le sondage</Link>
              </Button>

              <div className="flex flex-col items-center gap-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Ou télécharger l'application mobile :
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/api/download/ipa"
                    download="okany-survey.ipa"
                    className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-white transition-opacity hover:opacity-80"
                  >
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Télécharger</div>
                      <div className="text-sm font-semibold">Application iOS</div>
                    </div>
                  </a>

                  <a
                    href="/api/download/apk"
                    download="okany-survey.apk"
                    className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-white transition-opacity hover:opacity-80"
                  >
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.523 15.341c-.538-.586-.894-1.366-.894-2.341 0-.975.356-1.755.894-2.341.538-.586 1.27-.909 2.027-.909.757 0 1.489.323 2.027.909.538.586.894 1.366.894 2.341 0 .975-.356 1.755-.894 2.341-.538.586-1.27.909-2.027.909-.757 0-1.489-.323-2.027-.909zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Télécharger</div>
                      <div className="text-sm font-semibold">Application Android</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-x-8 text-sm flex-wrap">
              <div className="flex items-center gap-x-2 text-muted-foreground">
                <svg
                  className="h-5 w-5 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>5-10 minutes</span>
              </div>
              <div className="flex items-center gap-x-2 text-muted-foreground">
                <svg
                  className="h-5 w-5 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <span>Anonyme & sécurisé</span>
              </div>
              <div className="flex items-center gap-x-2 text-muted-foreground">
                <svg
                  className="h-5 w-5 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>Libreville, Lambaréné, Mouila</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 sm:py-20 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-4">
                Vision du Chef de l'État
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Une initiative pour la modernisation
              </h2>
            </div>

            <div className="space-y-6 text-base leading-7 text-muted-foreground">
              <p>
                Dans le cadre de la{" "}
                <strong className="text-foreground font-semibold">
                  vision du Chef de l'État
                </strong>
                , axée sur la modernisation de l'administration publique et
                l'amélioration continue des services rendus aux citoyens, la{" "}
                <strong className="text-foreground font-semibold">
                  Direction Générale du Contrôle Budgétaire et Financier
                </strong>{" "}
                a déployé ce sondage.
              </p>

              <p>
                Cette initiative s'inscrit dans les grandes orientations de
                l'État visant à renforcer la confiance des usagers, à promouvoir
                l'équité et à répondre aux besoins des citoyens avec diligence
                et professionnalisme.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center rounded-2xl bg-primary/10 p-3 mb-6">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Votre avis est précieux !
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              En participant à ce sondage, vous contribuez directement à
              l'évaluation et à l'amélioration de la qualité des services
              publics fonciers.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="shadow-md">
                <Link href="/stage-selection">Je participe maintenant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Processus simple et rapide
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Comment participer au sondage
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Nous vous remercions pour votre engagement et vous invitons à
              partager vos retours d'expérience afin de bâtir ensemble un
              service public toujours plus performant et au plus près de vos
              attentes.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    1
                  </div>
                  Identifiez votre étape
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Indiquez jusqu'où votre procédure foncière est arrivée parmi
                    les 6 étapes du processus.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    2
                  </div>
                  Répondez aux questions
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Évaluez chaque étape de votre parcours : satisfaction,
                    délais, qualité du service.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    3
                  </div>
                  Contribuez à l'amélioration
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Vos retours aideront la DGCBF à améliorer les services
                    fonciers au Gabon.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Pourquoi participer ?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Ce sondage permettra d'identifier les obstacles et d'améliorer la
              transparence, l'efficacité et la qualité du service dans les
              procédures foncières gérées par l'ANUTTC.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-card/50 p-2 ring-1 ring-border/50">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-foreground">
                  Participation
                </dt>
                <dd className="mt-2 leading-7 text-muted-foreground">
                  Ouverte à tous les usagers
                </dd>
              </div>

              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-card/50 p-2 ring-1 ring-border/50">
                  <svg
                    className="h-6 w-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-foreground">
                  Durée estimée
                </dt>
                <dd className="mt-2 leading-7 text-muted-foreground">
                  5 à 10 minutes
                </dd>
              </div>

              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-card/50 p-2 ring-1 ring-border/50">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-foreground">
                  Confidentialité
                </dt>
                <dd className="mt-2 leading-7 text-muted-foreground">
                  Anonyme et sécurisé
                </dd>
              </div>

              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-card/50 p-2 ring-1 ring-border/50">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-foreground">
                  Mandaté par
                </dt>
                <dd className="mt-2 leading-7 text-muted-foreground">
                  Direction Générale du Contrôle Budgétaire et Financier
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl sm:px-16">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary to-primary/90" />
            <div className="absolute inset-0 -z-10 opacity-20">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="grid"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 32V.5M32 .5H0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Prêt à partager votre expérience ?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/90">
                Nous vous remercions pour votre engagement et vous invitons à
                partager vos retours d'expérience afin de bâtir ensemble un
                service public toujours plus performant et au plus près de vos
                attentes.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="shadow-xl"
                >
                  <Link href="/stage-selection">Commencer maintenant</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-2xl bg-card/80 backdrop-blur-sm p-8 shadow-lg ring-1 ring-border/50">
              <svg
                className="h-12 w-12 mx-auto text-primary mb-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <p className="text-lg font-semibold text-foreground italic mb-2">
                "La modernisation de l'administration publique et l'amélioration
                continue des services rendus aux citoyens"
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-base font-semibold text-foreground">
                  La Direction Générale du Contrôle Budgétaire et Financier
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  République Gabonaise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
