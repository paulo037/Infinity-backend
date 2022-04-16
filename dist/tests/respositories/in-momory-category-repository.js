"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCategoryRepository = void 0;
class InMemoryCategoryRepository {
    constructor() {
        this.items = [];
    }
    async create(category) {
        this.items.push(category);
        return null;
    }
    async update(category) {
        this.items.forEach((p, index) => {
            if (p.id === category.id)
                this.items[index] = category;
        });
        return null;
    }
    async delete(id) {
        let category;
        this.items.forEach(element => {
            if (element.id === id) {
                category = this.items.splice(this.items.indexOf(element), 1);
            }
        });
        if (category)
            return null;
        throw new Error("produto não encontrado");
    }
    async findById(id) {
        const category = this.items.find(category => category.id === id);
        if (!category) {
            return null;
        }
        return category;
    }
    async findByName(name) {
        const category = this.items.find(category => category.name === name);
        return category !== null && category !== void 0 ? category : null;
    }
}
exports.InMemoryCategoryRepository = InMemoryCategoryRepository;
