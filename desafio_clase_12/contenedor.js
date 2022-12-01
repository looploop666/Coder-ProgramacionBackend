const fs = require('fs');

module.exports = class Contenedor {

    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(object) {

        try {
            if (await this.checkFileExists(`./${this.fileName}`)) {
                const data = await this.getAll();
                let idMax = Object.keys(data).length;
                let newId = idMax + 1;
                data.push({ ...object, id: newId });
                await fs.promises.writeFile(this.fileName, JSON.stringify(data));

                return newId;
            } else {
                let data = [];
                let idMax = 1;
                data.push({ ...object, id: idMax });
                await fs.promises.appendFile(this.fileName, JSON.stringify(data));

                return idMax;
            }

        }
        catch (error) {

            throw new Error(error);
        }

    }

    async getById(id) {
        try {
            const data = await this.getAll();
            const objectFound = data.find(x => x.id === id);

            return objectFound ?? null;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAll() {
        try {
            const result = await fs.promises.readFile(this.fileName);
            const data = await JSON.parse(result);
            return data;

        }
        catch (error) {
            console.log(error)
            //throw new Error(error);
        }
    }
    async deleteById(id) {
        try {
            if (isNaN(id)) throw new Error("El id ingresado es inválido");

            const data = await this.getAll();
            const objectFound = data.find(x => x.id === id);
            if (objectFound) {
                const newData = data.filter(x => x.id !== id);

                await fs.promises.writeFile(this.fileName, JSON.stringify(newData));

            } else {
                throw new Error("El id ingresado no existe.");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll() {
        try {

            await fs.promises.writeFile(this.fileName, JSON.stringify([]));
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async checkFileExists(filePath) {
        return fs.promises.access(filePath, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false)
    }
}

