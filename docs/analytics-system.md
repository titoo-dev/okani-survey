# Système d'Analytics Personnalisé

## Vue d'ensemble

Le système d'analytics personnalisé permet de tracker les visites, événements et sessions des utilisateurs sur l'application. Il remplace les données simulées par de vraies données collectées en temps réel.

## Architecture

### Base de données
- **AnalyticsEvent** : Stocke tous les événements (page_view, survey_started, etc.)
- **AnalyticsSession** : Stocke les informations de session des utilisateurs

### Composants
- **Server-side tracking** : `lib/analytics.ts` avec fonction `track()`
- **Client-side tracking** : `hooks/use-analytics.ts` avec hook `useAnalytics()`
- **API endpoint** : `app/api/analytics/track/route.ts`
- **Provider** : `components/analytics-provider.tsx`

## Utilisation

### 1. Tracking côté serveur

```typescript
import { track, trackPageView, trackSurveyStarted } from "@/lib/analytics";

// Track un événement personnalisé
await track("custom_event", { 
  metadata: { customData: "value" } 
});

// Track une page view
await trackPageView("/dashboard");

// Track le début d'une enquête
await trackSurveyStarted(userId);
```

### 2. Tracking côté client

```typescript
import { useAnalytics } from "@/hooks/use-analytics";

function MyComponent() {
  const { 
    trackEvent, 
    trackButtonClick, 
    trackSurveyStarted 
  } = useAnalytics();

  const handleClick = () => {
    trackButtonClick("submit_survey");
  };

  const handleSurveyStart = () => {
    trackSurveyStarted();
  };

  return (
    <button onClick={handleClick}>
      Commencer l'enquête
    </button>
  );
}
```

### 3. Hook simple pour les événements

```typescript
import { useTrack } from "@/hooks/use-analytics";

function MyComponent() {
  const track = useTrack();

  const handleAction = () => {
    track("user_action", { action: "click" });
  };

  return <button onClick={handleAction}>Action</button>;
}
```

## Événements trackés automatiquement

- **page_view** : Chaque changement de page
- **page_visible** : Quand l'utilisateur revient sur l'onglet
- **page_hidden** : Quand l'utilisateur quitte l'onglet
- **page_unload** : Avant que l'utilisateur quitte la page

## Événements personnalisés disponibles

- `trackSurveyStarted()` : Début d'une enquête
- `trackSurveyCompleted()` : Enquête terminée
- `trackSurveyAbandoned()` : Enquête abandonnée
- `trackButtonClick(name)` : Clic sur un bouton
- `trackFormSubmit(name)` : Soumission de formulaire
- `trackError(error)` : Erreur rencontrée

## Données collectées

### Informations système
- User Agent
- Adresse IP
- Pays/Ville (si disponible)
- Type d'appareil (desktop/mobile/tablet)
- Navigateur
- Système d'exploitation

### Informations de session
- ID de session unique
- Durée de session
- Nombre de pages vues
- Nombre d'événements
- Utilisateur connecté (si applicable)

### Métadonnées
- URL de la page
- Referrer
- Données personnalisées
- Timestamp

## Configuration

### Variables d'environnement
Aucune configuration supplémentaire n'est nécessaire. Le système fonctionne automatiquement.

### Migration de la base de données
```bash
pnpm prisma db push
```

## Dashboard Analytics

Les données sont automatiquement utilisées dans le dashboard administrateur :
- Visites journalières
- Visiteurs uniques
- Graphiques d'évolution
- Statistiques en temps réel

## Sécurité et confidentialité

- Les adresses IP sont collectées pour l'analyse géographique
- Aucune donnée personnelle sensible n'est stockée
- Les sessions sont anonymisées
- Conformité RGPD : les données sont collectées pour l'amélioration du service

## Performance

- Tracking asynchrone (n'interrompt pas l'expérience utilisateur)
- Gestion d'erreurs robuste
- Fallback vers données simulées si nécessaire
- Optimisé pour les applications Next.js

## Développement

### Mode développement
Le système fonctionne en mode développement avec des données simulées jusqu'à ce que la base de données soit configurée.

### Mode production
Une fois la base de données configurée, les vraies données sont collectées et affichées dans le dashboard.
