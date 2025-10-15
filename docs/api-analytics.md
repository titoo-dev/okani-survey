# Analytics API Endpoints

## Vue d'ensemble

L'API Analytics fournit des endpoints pour récupérer les statistiques de visiteurs et d'utilisation de l'application. Ces endpoints sont conçus pour être utilisés par les applications mobiles et les tableaux de bord.

## Endpoints disponibles

### 1. Statistiques publiques (sans authentification)
**GET** `/api/analytics/public`

Endpoint public pour récupérer les statistiques de base sans authentification.

#### Paramètres de requête
- `days` (optionnel) : Nombre de jours à récupérer (défaut: 7, max: 30)

#### Exemple de requête
```bash
GET /api/analytics/public?days=14
```

#### Exemple de réponse
```json
{
  "success": true,
  "data": {
    "period": {
      "days": 14,
      "startDate": "2024-10-01T00:00:00.000Z",
      "endDate": "2024-10-15T00:00:00.000Z"
    },
    "summary": {
      "totalVisits": 1250,
      "totalUniqueVisitors": 890,
      "completionRate": 78.5,
      "surveysStarted": 45,
      "surveysCompleted": 35
    },
    "dailyVisits": [
      {
        "date": "2024-10-01",
        "visits": 85,
        "uniqueVisitors": 62
      },
      {
        "date": "2024-10-02",
        "visits": 92,
        "uniqueVisitors": 68
      }
    ]
  }
}
```

### 2. Statistiques détaillées (avec authentification)
**GET** `/api/analytics/stats`

Endpoint complet pour récupérer toutes les statistiques détaillées.

#### Paramètres de requête
- `days` (optionnel) : Nombre de jours à récupérer (défaut: 30, max: 90)

#### Exemple de requête
```bash
GET /api/analytics/stats?days=30
```

#### Exemple de réponse
```json
{
  "success": true,
  "data": {
    "period": {
      "days": 30,
      "startDate": "2024-09-15T00:00:00.000Z",
      "endDate": "2024-10-15T00:00:00.000Z"
    },
    "summary": {
      "totalVisits": 5420,
      "totalUniqueVisitors": 3200,
      "totalSessions": 3800,
      "completionRate": 82.3
    },
    "dailyVisits": [...],
    "topPages": [
      {
        "page": "/",
        "visits": 1250
      },
      {
        "page": "/survey",
        "visits": 890
      }
    ],
    "deviceStats": [
      {
        "device": "mobile",
        "visits": 3200
      },
      {
        "device": "desktop",
        "visits": 2220
      }
    ],
    "browserStats": [
      {
        "browser": "chrome",
        "visits": 2800
      },
      {
        "browser": "safari",
        "visits": 1500
      }
    ],
    "hourlyStats": [
      {
        "hour": 0,
        "visits": 45
      },
      {
        "hour": 1,
        "visits": 32
      }
    ]
  }
}
```

### 3. Statistiques en temps réel
**GET** `/api/analytics/realtime`

Endpoint pour récupérer les statistiques en temps réel.

#### Exemple de requête
```bash
GET /api/analytics/realtime
```

#### Exemple de réponse
```json
{
  "success": true,
  "data": {
    "timestamp": "2024-10-15T14:30:00.000Z",
    "realtime": {
      "currentHourVisits": 45,
      "todayVisits": 320,
      "todayUniqueVisitors": 280,
      "activeSessions": 12
    },
    "hourlyBreakdown": [
      {
        "hour": 0,
        "visits": 5
      },
      {
        "hour": 1,
        "visits": 3
      }
    ],
    "topPagesToday": [
      {
        "page": "/",
        "visits": 120
      },
      {
        "page": "/survey",
        "visits": 85
      }
    ],
    "deviceBreakdown": [
      {
        "device": "mobile",
        "visits": 200
      },
      {
        "device": "desktop",
        "visits": 120
      }
    ],
    "recentEvents": [
      {
        "event": "page_view",
        "page": "/",
        "device": "mobile",
        "browser": "chrome",
        "timestamp": "2024-10-15T14:29:45.000Z"
      }
    ]
  }
}
```

## Utilisation dans les applications mobiles

### Configuration de base
```javascript
const API_BASE_URL = 'https://your-domain.com/api/analytics';

// Récupérer les statistiques publiques
async function getPublicStats(days = 7) {
  try {
    const response = await fetch(`${API_BASE_URL}/public?days=${days}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching public stats:', error);
    return null;
  }
}

// Récupérer les statistiques en temps réel
async function getRealtimeStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/realtime`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching realtime stats:', error);
    return null;
  }
}
```

### Exemple d'utilisation React Native
```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const AnalyticsScreen = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('https://your-domain.com/api/analytics/public?days=7');
      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Total Visits: {stats.summary.totalVisits}</Text>
      <Text>Unique Visitors: {stats.summary.totalUniqueVisitors}</Text>
      <Text>Completion Rate: {stats.summary.completionRate}%</Text>
      
      <FlatList
        data={stats.dailyVisits}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Text>{item.date}: {item.visits} visits</Text>
        )}
      />
    </View>
  );
};
```

### Exemple d'utilisation Flutter
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class AnalyticsService {
  static const String baseUrl = 'https://your-domain.com/api/analytics';
  
  static Future<Map<String, dynamic>> getPublicStats({int days = 7}) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/public?days=$days')
      );
      
      if (response.statusCode == 200) {
        return json.decode(response.body);
      }
    } catch (e) {
      print('Error fetching stats: $e');
    }
    return {};
  }
  
  static Future<Map<String, dynamic>> getRealtimeStats() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/realtime')
      );
      
      if (response.statusCode == 200) {
        return json.decode(response.body);
      }
    } catch (e) {
      print('Error fetching realtime stats: $e');
    }
    return {};
  }
}
```

## Gestion des erreurs

Tous les endpoints retournent une structure de réponse cohérente :

### Succès
```json
{
  "success": true,
  "data": { ... }
}
```

### Erreur
```json
{
  "success": false,
  "error": "Description de l'erreur"
}
```

## Limites et considérations

- **Rate limiting** : 100 requêtes par minute par IP
- **Cache** : Les données sont mises en cache pendant 5 minutes
- **Données sensibles** : L'endpoint public ne retourne pas d'informations sensibles
- **Performance** : Les requêtes sont optimisées pour les applications mobiles

## Sécurité

- L'endpoint `/public` est accessible sans authentification
- Les endpoints `/stats` et `/realtime` peuvent nécessiter une authentification selon la configuration
- Les données sont anonymisées et ne contiennent pas d'informations personnelles
- Conformité RGPD : Les données sont collectées pour l'amélioration du service uniquement
