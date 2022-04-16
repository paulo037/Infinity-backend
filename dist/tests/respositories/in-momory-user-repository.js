"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    constructor() {
        this.items = [];
    }
    async create(user) {
        this.items.push(user);
        return null;
    }
    async update(user) {
        this.items.forEach((p, index) => {
            if (p.id === user.id)
                this.items[index] = user;
        });
        return null;
    }
    async delete(id) {
        let user;
        this.items.forEach(element => {
            if (element.id === id) {
                user = this.items.splice(this.items.indexOf(element), 1);
            }
        });
        if (user)
            return null;
        throw new Error("produto não encontrado");
    }
    async findById(id) {
        const user = this.items.find(user => user.id === id);
        return user !== null && user !== void 0 ? user : null;
    }
    async findByEmail(email) {
        const user = this.items.find(user => user.email === email);
        return user !== null && user !== void 0 ? user : null;
    }
    async getAllUsers() {
        return this.items;
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
