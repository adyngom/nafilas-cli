# Nafilas

Nafilas est un outil CLI Node.js conçu pour assister les musulmans pendant le mois sacré du Ramadan. Il fournit les séquences recommandées de prières (Nafilas) et de Sourates à réciter pour chaque nuit du Ramadan, ainsi que les récompenses associées.

![npx-nafilas](https://github.com/adyngom/nafilas-cli/assets/290986/8e0533cc-4d0b-48dd-a60c-bc8f034cefac)


## Fonctionnalités

- Ligne de commande interactive alimentée par [Clack.js](https://github.com/natemoo-re/clack)
- Se souvient de la dernière nuit sélectionnée et démarre à partir de cette position la prochaine fois
- Affiche la séquence recommandée de Rakas, Sallama, récitations de Sourates et récompenses pour la nuit sélectionnée
- Prend en charge les caractères Unicode pour une meilleure représentation visuelle

## Installation

Pour utiliser l'outil Compagnon des Nafilas, vous devez avoir Node.js installé sur votre système. Vous pouvez télécharger la dernière version de Node.js sur le site officiel : [https://nodejs.org](https://nodejs.org)

Une fois Node.js installé, vous pouvez installer l'outil Compagnon des Nafilas globalement en utilisant la commande suivante :

```bash
npm i -g nafilas-cli
```


## Utilisation

Pour démarrer l'outil Compagnon des Nafilas, exécutez la commande suivante dans votre terminal :

```bash
nafilas
```

ou bien avec npx

```bash
npx nafilas-cli
```

L'outil vous saluera avec un message de bienvenue et vous invitera à entrer la nuit du Ramadan (1-29). Vous pouvez naviguer dans les options à l'aide des touches fléchées ou en saisissant le numéro correspondant.

Une fois que vous avez sélectionné une nuit, l'outil affichera la séquence recommandée pour cette nuit, y compris le nombre de Rakas, de Sallama, les récitations de Sourates avec leurs noms en anglais et le nombre de fois à les réciter, ainsi que les récompenses associées.

## Configuration

L'outil Compagnon des Nafilas stocke la dernière nuit sélectionnée dans un fichier de configuration situé dans le répertoire de configuration de votre système (par exemple, ~/.config/configstore/nafilas.json sur Linux/macOS ou %APPDATA%/Configstore/nafilas.json sur Windows). Si vous souhaitez effacer la configuration stockée, vous pouvez supprimer le fichier de configuration correspondant du répertoire système.

## Fichier de données

L'outil s'appuie sur deux fichiers de données JSON :

- `nafilas.json` : contient les séquences recommandées de Rakas, Sallama, récitations de Sourates et récompenses pour chaque nuit du Ramadan
- `suras.json` : contient les noms des Sourates en arabe et en anglais

Ces fichiers de données sont regroupés avec l'outil Compagnon des Nafilas et sont utilisés pour afficher les séquences recommandées et les récompenses pour chaque nuit. Ils se trouvent dans le répertoire `data` du package Compagnon des Nafilas.

## Contribution

1. Faites un fork du projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Faites un commit de vos modifications (`git commit -am 'Ajoute ma fonctionnalité'`)
4. Poussez votre branche (`git push origin feature/ma-fonctionnalite`)
5. Créez une nouvelle Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) pour plus de détails.
