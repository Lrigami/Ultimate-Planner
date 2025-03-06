const { query } = require("../config/database");

class Method {

    // Methods
    async create(data) {
        return await new this.table(data).save();
    }

    async readAll() {
        const result = await query('SELECT * FROM tasks');
        return result.rows;
    }

    async readOne(id) {
        return await this.table.findById(id);
    }
    
    async update(id, data) {
        return await this.table.findByIdAndUpdate(id, data, { new: true });
    }
    
    async delete(id) {
        return await this.table.findByIdAndDelete(id);
    }
};

module.exports = new Method("tasks");