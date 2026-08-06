# Ultra Tech Multiservice — Site Full-Stack & Panel Admin

Ce projet contient l'application web officielle d'**Ultra Tech Multiservice** (Douala, Cameroun) ainsi que son panneau d'administration interne séparé.

---

## 📁 Structure du Projet

Le projet a été restructuré en deux applications indépendantes et légères :

1. **`site/`** : Le site vitrine public destiné aux clients (`ultratechmultiservice.com`).
   * Vente de produits, planification de rendez-vous, présentation des services.
   * Tout achat ou planification génère un message WhatsApp pré-rempli pour confirmer en direct.
   * Animation 2.5D premium fluide sur smartphone dans le Hero.
   
2. **`admin/`** : Le panneau de gestion interne pour le personnel (`admin.ultratechmultiservice.com`).
   * Gestion de stock en temps réel.
   * Suivi des demandes de rendez-vous.
   * Enregistrement des ventes directes en magasin avec déduction automatique des stocks.
   * Impression thermique de reçus clients.

---

## 🚀 Lancement en Local (Développement)

Les deux applications possèdent leurs propres dépendances et configurations. Vous pouvez les lancer en parallèle :

### 1. Site Public (Port 3000)
```bash
cd site
npm run dev
```
Accès local : [http://localhost:3000](http://localhost:3000)

### 2. Panneau d'Administration (Port 3001)
```bash
cd admin
npm run dev
```
Accès local : [http://localhost:3001](http://localhost:3001)
*Mot de passe par défaut : `admin`* (modifiable dans les paramètres).

---

## 💾 Base de données & Supabase

Le système de persistance est conçu avec un **double mécanisme** :

1. **Mode Hors ligne / Démonstration (par défaut)** : 
   Si aucune clé Supabase n'est fournie, l'application sauvegarde toutes les données (produits, ventes, rendez-vous, paramètres) directement dans le **LocalStorage** de votre navigateur. Vous pouvez ajouter, modifier des produits et enregistrer des ventes immédiatement sans aucune configuration !
   
2. **Mode Supabase (Production)** : 
   Lorsque vous êtes prêt à passer en production, créez simplement un fichier `.env.local` dans les répertoires `site/` et `admin/` avec les clés Supabase :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme
   ```
   L'application basculera alors automatiquement et de manière transparente sur votre base de données Supabase distante !

---

## 🛠️ Schéma SQL Supabase (Pour la Production)

Pour initialiser les tables sur votre projet Supabase, exécutez le script SQL suivant dans l'éditeur de requêtes SQL (SQL Editor) de votre tableau de bord Supabase :

```sql
-- Table des Produits
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock_quantity INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table des Rendez-vous
CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  device_type TEXT,
  requested_date DATE NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'nouveau',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table des Ventes
CREATE TABLE sales (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table des Paramètres
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);
```
Deployment update
---

## 💻 Conçu par M-TECH
Site conçu, restructuré et développé pour **Ultra Tech Multiservice** par **M-TECH**.
