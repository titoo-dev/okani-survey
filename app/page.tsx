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
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mb-8">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                <span>Enquête en cours</span>
                <span className="mx-2 text-primary/40">·</span>
                <span className="text-muted-foreground">10 oct - 9 nov 2025</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Enquête de Satisfaction ANUTTC
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              La Direction Générale du Contrôle Budgétaire et Financier mandate le cabinet OKANI pour évaluer 
              votre satisfaction concernant les procédures foncières gérées par l'ANUTTC.
            </p>

            <div className="mt-10 flex items-center gap-x-6">
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/survey">
                  Commencer l'enquête
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  En savoir plus
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-x-6 text-sm">
              <div className="flex items-center gap-x-2 text-muted-foreground">
                <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5-10 minutes</span>
              </div>
              <div className="flex items-center gap-x-2 text-muted-foreground">
                <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>Anonyme & sécurisé</span>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="rounded-3xl bg-card/50 backdrop-blur-sm p-8 shadow-2xl ring-1 ring-border/50">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Trois villes ciblées</h3>
                      <p className="text-sm text-muted-foreground">Libreville, Lambaréné et Mouila</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">6 étapes évaluées</h3>
                      <p className="text-sm text-muted-foreground">De la demande à la décision finale</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Enquête conditionnelle</h3>
                      <p className="text-sm text-muted-foreground">Questions adaptées à votre situation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Processus simple</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Comment participer à l'enquête
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Un processus simple et rapide pour partager votre expérience avec l'ANUTTC
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
                  <p className="flex-auto">Indiquez jusqu'où votre procédure foncière est arrivée parmi les 6 étapes du processus.</p>
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
                  <p className="flex-auto">Évaluez chaque étape de votre parcours : satisfaction, délais, qualité du service.</p>
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
                  <p className="flex-auto">Vos retours aideront la DGCBF à améliorer les services fonciers au Gabon.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Votre voix compte
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Cette enquête permettra d'identifier les obstacles et d'améliorer la transparence, l'efficacité 
                et la qualité du service dans les procédures foncières.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <Button asChild size="lg" className="flex-none">
                  <Link href="/survey">
                    Participer maintenant
                  </Link>
                </Button>
              </div>
            </div>
            
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-card/50 p-2 ring-1 ring-border/50">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-foreground">Période d'enquête</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">10 octobre - 9 novembre 2025</dd>
              </div>

              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-card/50 p-2 ring-1 ring-border/50">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-foreground">Durée estimée</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">5 à 10 minutes</dd>
              </div>

              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-card/50 p-2 ring-1 ring-border/50">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-foreground">Confidentialité</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">Anonyme et sécurisé</dd>
              </div>

              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-card/50 p-2 ring-1 ring-border/50">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-foreground">Mandaté par</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">DGCBF</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex flex-col gap-4 md:order-2">
            <p className="text-sm leading-5 text-muted-foreground">
              Une initiative de la DGCBF réalisée par le cabinet OKANI
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
    </main>
  );
}

