
# Guide d'utilisation du module `huffman-data-compressor`

Ce module implémente l'algorithme de codage de Huffman pour la compression et la décompression de données. Il permet de réduire la taille des données en attribuant des codes binaires de longueur variable aux symboles, les symboles les plus fréquents recevant des codes plus courts.

## Table des matières

- [Introduction](#introduction)
- [Installation](#installation)
- [Utilisation](#utilisation)
  - [Compression et décompression de chaînes de caractères](#compression-et-décompression-de-chaînes-de-caractères)
  - [Compression et décompression de fichiers](#compression-et-décompression-de-fichiers)
- [API](#api)
  - [Classe Huffman](#classe-huffman)
  - [Classe fileConversion](#classe-fileconversion)
- [Remarques](#remarques)
- [Références](#références)

## Introduction

Le module `huffman-data-compressor` permet d'implémenter l'algorithme de Huffman pour la compression et la décompression de données. Cette technique est particulièrement utile pour réduire la taille des données dans des environnements avec une bande passante limitée ou pour optimiser le stockage.

## Installation

Pour installer le module, utilisez npm :

```bash
npm install huffman-data-compressor
```

## Utilisation

### Compression et décompression de chaînes de caractères

L'exemple suivant montre comment compresser et décompresser une chaîne de caractères :

```javascript
const { Huffman } = require('huffman-data-compressor');

// Chaîne à compresser
const data = 'exemple de chaîne à compresser';

// Création d'une instance de Huffman
const huffman = new Huffman();

// Calcul des fréquences des symboles
const freq = huffman.getFrequency(data);

// Construction de l'arbre de Huffman
const root = huffman.createHuffmanTree(freq);

// Génération de la bibliothèque de codes
const codes = new Map();
huffman.createLibrary(root, '', codes);

// Compression de la chaîne
const encodedData = huffman.encode(data, codes);
console.log('Données compressées :', encodedData);

// Décompression de la chaîne
const decodedData = huffman.decode(encodedData, codes);
console.log('Données décompressées :', decodedData);
```

### Compression et décompression de fichiers

Le module offre également des fonctionnalités pour compresser et décompresser des fichiers. L'exemple ci-dessous montre comment décompresser un fichier :

```javascript
const { fileConversion } = require('huffman-data-compressor');

// Création d'une instance de fileConversion
const file = new fileConversion();

// Décompression d'un fichier compressé
// 'chemin/vers/fichier_compressé.huf' : chemin du fichier compressé
// 'chemin/vers/dossier_de_sortie' : dossier où sera placé le fichier décompressé
file.decompressFile('chemin/vers/fichier_compressé.huf', 'chemin/vers/dossier_de_sortie');
```

Pour compresser un fichier, utilisez la méthode `compressFile` :

```javascript
// Compression d'un fichier
file.compressFile('chemin/vers/fichier_à_compresser');
```

## API

### Classe Huffman

- **`getFrequency(data: string): Map<string, number>`**  
  Calcule la fréquence d'apparition de chaque symbole dans la chaîne `data` et retourne une Map associant chaque symbole à sa fréquence.

- **`createHuffmanTree(freq: Map<string, number>): Node`**  
  Construit l'arbre de Huffman à partir des fréquences et retourne la racine de l'arbre.

- **`createLibrary(root: Node, code: string, codes: Map<string, string>): void`**  
  Parcourt l'arbre de Huffman pour générer une bibliothèque (Map) associant à chaque symbole son code binaire.

- **`encode(data: string, codes: Map<string, string>): string`**  
  Encode la chaîne `data` en utilisant la Map des codes générée. Retourne la chaîne encodée.

- **`decode(encodedData: string, codes: Map<string, string>): string`**  
  Décode la chaîne encodée `encodedData` en utilisant la Map des codes et retourne la chaîne originale.

### Classe fileConversion

- **`compressFile(inputPath: string): void`**  
  Compresse le fichier situé à `inputPath`.

- **`decompressFile(inputPath: string, outputDir: string): void`**  
  Décompresse le fichier situé à `inputPath` et sauvegarde le fichier décompressé dans le répertoire `outputDir`.

## Remarques

- Assurez-vous que les données à compresser ou décompresser sont valides (chaînes de caractères pour la compression de texte, fichiers existants pour la compression/décompression de fichiers).
- La méthode `decompressFile` crée le fichier décompressé dans le répertoire de sortie spécifié.
- Le module est conçu pour être utilisé dans un environnement Node.js.

## Références

- [Codage de Huffman sur Wikipedia (FR)](https://fr.wikipedia.org/wiki/Codage_de_Huffman)
- [Huffman Coding sur Wikipedia (EN)](https://en.wikipedia.org/wiki/Huffman_coding)