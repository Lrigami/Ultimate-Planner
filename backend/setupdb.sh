#!/bin/bash

DB_NAME="ultimate_planner"
USER="postgres"
SQL_FILE="createdb.sql"

# Permet de détecter la 'locale' (=paramètres régionaux) de l'OS donc pour récupérer la langue : grep LANG= et ensuite on sépare ce qu'on obtient 
# on coupe une fois après = donc on obtient quelque chose comme fr_FR.UTF-8
# on coupe une seconde fois avant . donc on obtient fr_FR
SYS_LOCALE=$(locale | grep LANG= | cut -d= -f2 | cut -d. -f1)
SYS_LOCALE=${SYS_LOCALE:-"en_EN"} # Si SYS_LOCALE est vide, je mets par défaut en_EN comme mon projet est par défaut en anglais

# là je vérifie que la base de données existe déjà mais je demande à l'utilisateur s'il souhaite la supprimer ou pas plutôt que de lee faire par défaut
if psql -U $USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
  echo "Database '$DB_NAME' already exists."
  read -p "Do you want to delete and recreate it ? (y/n) : " choice
  if [[ "$choice" == "y" ]]; then
    echo "Deleting database '$DB_NAME'..."
    psql -U $USER -d postgres -c "DROP DATABASE $DB_NAME;"
  else
    echo "Process aborted. No modifications were made."
    exit 1
  fi
fi

echo "Creating database '$DB_NAME' With locale '$SYS_LOCALE'..."

# la première partie me permet de remplacer le fr-FR par SYS_LOCALE qu'on a déterminé au-dessus
# et ensquite c'est la commande de base pour exécuter mon SQL sur la base postgres
sed "s/fr-FR/$SYS_LOCALE/g" $SQL_FILE | psql -U $USER -d postgres

# Vérifier que la base a bien été créée avant d’importer planner.sql
# Etape 1 : afficher le nom des bases 
# Etape 2 : sélectionner la première colonne qui contient le nom des bases de données 
# Etape 3 : chercher si la base de données y apparait 
if psql -U $USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
  echo "Database '$DB_NAME' has been created successfully."
  echo "Importing structure from 'planner.sql'..."
  # Et ensuite la commande de base pour que ultimate_planner ait la structure de planner.sql fourni
  psql -U $USER -d $DB_NAME -f planner.sql
  echo "Import completed successfully!"
else
  echo "Error: Database '$DB_NAME' was not created."
  exit 1
fi