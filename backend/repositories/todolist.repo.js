const { query } = require("../config/database");
const pool = require("../config/database");

class Method {

    async create(data) {
        // créer une to-do list (titre, couleur, pinned)
    }

    async readAll() {
        // lire toutes les to-do lists : pour la liste des to-do lists
    }

    async readOne() {
        // lire une seule to-do list : pour les cartes to-do list
    }

    async update(id, data) {
        // pour mettre à jour une to-do list (son titre, sa couleur, pin ou pas)
    }

    async delete(id) {
        // pour supprimer une to-do list (attention il faut aussi supprimer toutes les tâches qu'elle contient).
    }
}

module.exports = new Method("todolist");