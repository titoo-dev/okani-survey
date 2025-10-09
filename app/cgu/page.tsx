import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation - Okani Survey",
  description:
    "Conditions Générales d'Utilisation de la plateforme de sondage sur la satisfaction du foncier au Gabon",
};

export default function CGUPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Plateforme de sondage sur la satisfaction du foncier
          </p>
          <div className="rounded-2xl bg-muted/30 backdrop-blur-sm p-6 shadow-sm ring-1 ring-border/50">
            <p className="text-base leading-7 text-muted-foreground">
              Les Conditions Générales d'Utilisation (CGU) pour une plateforme
              de sondage sur la satisfaction du foncier au Gabon, mise en place
              par la Direction Générale du Contrôle Budgétaire et Financier
              (DGCBF), doivent être claires, conformes aux réglementations
              locales (comme la loi gabonaise sur la protection des données
              personnelles, Loi n°001/2011) et adaptées à l'usage numérique.
              Voici une proposition concise de CGU pour cette plateforme de
              sondage, rédigée dans un langage simple et structuré.
            </p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <section className="mb-12 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                1
              </span>
              Objet
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              La présente plateforme, gérée par la{" "}
              <strong className="text-foreground">
                Direction Générale du Contrôle Budgétaire et Financier (DGCBF)
              </strong>
              , vise à collecter les avis des usagers sur les services fonciers
              au Gabon afin d'améliorer leur qualité et de renforcer la
              transparence dans la gestion budgétaire et financière.
            </p>
          </section>

          <section className="mb-12 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                2
              </span>
              Accès à la plateforme
            </h2>
            <ul className="space-y-3 text-base leading-7 text-muted-foreground list-none">
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  La plateforme est accessible à toute personne physique ou
                  morale ayant interagi avec les services fonciers gabonais.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  L'accès est gratuit et nécessite une connexion Internet.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Chaque utilisateur ne peut soumettre qu'une seule réponse pour
                  garantir l'intégrité des données (contrôle par adresse IP ou
                  identifiant unique, si applicable).
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                3
              </span>
              Collecte et traitement des données
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Données collectées
                </h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Les réponses au sondage (anonymes ou avec informations
                  démographiques optionnelles comme l'âge, la province ou le
                  statut d'usager) et, le cas échéant, des données techniques
                  (adresse IP, heure de connexion).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Finalité
                </h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Les données sont utilisées exclusivement pour analyser la
                  satisfaction des usagers et améliorer les services fonciers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Confidentialité
                </h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Conformément à la{" "}
                  <strong className="text-foreground">
                    Loi n°001/2011 sur la protection des données personnelles au
                    Gabon
                  </strong>
                  , les données sont anonymisées sauf indication contraire
                  explicite. Elles ne seront ni vendues ni transmises à des tiers
                  hors du cadre institutionnel de la DGCBF.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Durée de conservation
                </h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Les données sont conservées pendant 12 mois après la clôture du
                  sondage, sauf obligation légale contraire.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                4
              </span>
              Obligations de l'utilisateur
            </h2>
            <ul className="space-y-3 text-base leading-7 text-muted-foreground list-none">
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Fournir des réponses sincères et pertinentes.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Ne pas tenter de manipuler le système (ex. : soumissions
                  multiples frauduleuses).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Respecter les lois gabonaises, notamment en évitant tout
                  contenu diffamatoire ou illégal dans les champs ouverts.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                5
              </span>
              Responsabilité de la DGCBF
            </h2>
            <ul className="space-y-3 text-base leading-7 text-muted-foreground list-none">
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  La DGCBF s'engage à sécuriser la plateforme contre les
                  violations de données, conformément aux standards numériques.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  En cas d'interruption technique ou de dysfonctionnement, la
                  DGCBF ne pourra être tenue responsable des pertes d'accès
                  temporaires.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                6
              </span>
              Propriété intellectuelle
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Le contenu de la plateforme (questions, design, logo) est la
              propriété de la DGCBF ou de ses partenaires. Toute reproduction
              sans autorisation est interdite.
            </p>
          </section>

          <section className="mb-12 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                7
              </span>
              Modification des CGU
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              La DGCBF se réserve le droit de modifier les CGU. Les utilisateurs
              seront informés via la plateforme ou par annonce publique.
            </p>
          </section>

          <section className="mb-12 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                8
              </span>
              Droit applicable et litiges
            </h2>
            <ul className="space-y-3 text-base leading-7 text-muted-foreground list-none">
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Les présentes CGU sont soumises au droit gabonais.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Tout litige sera soumis aux juridictions compétentes de
                  Libreville.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                9
              </span>
              Contact
            </h2>
            <p className="text-base leading-7 text-muted-foreground mb-4">
              Pour toute question, contactez la DGCBF via :
            </p>
            <div className="space-y-2 text-base leading-7">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Email :</strong>{" "}
                <a
                  href="mailto:contact@dgcbf.gouv.ga"
                  className="text-primary hover:underline"
                >
                  contact@dgcbf.gouv.ga
                </a>
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Adresse :</strong> Ministère
                des Finances, Libreville
              </p>
            </div>
          </section>

          <section className="mb-12 rounded-2xl bg-primary/10 backdrop-blur-sm p-8 shadow-sm ring-1 ring-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Acceptation des CGU
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              En accédant à la plateforme et en participant au sondage, vous
              acceptez sans réserve les présentes Conditions Générales
              d'Utilisation.
            </p>
          </section>

          <section className="rounded-2xl bg-secondary/10 backdrop-blur-sm p-8 shadow-sm ring-1 ring-secondary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Notes et recommandations
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Adaptation locale
                </h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Assurez-vous que les CGU sont validées par un juriste gabonais
                  pour conformité avec la législation (notamment la CNPDCP pour
                  la protection des données).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Langage accessible
                </h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Le ton est volontairement simple pour être compris par un large
                  public. Une version en langue locale (si pertinent) peut être
                  ajoutée.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Mise en avant
                </h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Incluez un lien ou une case à cocher pour accepter les CGU
                  avant de commencer le sondage.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Dernière mise à jour : Octobre 2025
          </p>
        </div>
      </div>
    </main>
  );
}

