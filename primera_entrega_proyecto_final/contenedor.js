import fs from "fs";

export default class Contenedor {

    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(object) {

        try {
            if (await this.checkFileExists(`./${this.fileName}`)){
                const data = await this.getAll();
                let productosLength = data.length;
                let lastProduct = data[productosLength-1];
                let idMax = lastProduct.id;
                let newId = idMax + 1;
                data.push({ ...object, id: parseInt(newId) });
                await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data));

                return newId;
            } else {
                let data = [];
                let idMax = 1;
                data.push({ ...object, id: idMax });
                await fs.promises.appendFile(`./${this.fileName}`, JSON.stringify(data));

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
            const objectFound = data.find(x => x.id === parseInt(id));
            return objectFound ?? null;
        }
        catch (error) {
            throw new Error(error);
        }

    }
    async getAll() {
        try {
            const result = await fs.promises.readFile(`./${this.fileName}`);
            const data = await JSON.parse(result);
            return data;

        }
        catch (error) {
            console.log(error)
        }
    }
    async deleteById(id) {
        try {
            if (isNaN(id)) throw new Error("El id ingresado es inválido");

            const data = await this.getAll();
            const objectFound = data.find(x => x.id === parseInt(id));
            if (objectFound) {
                const newData = data.filter(x => x.id !== parseInt(id));

                await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newData));

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
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify([]));
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

    async updateById(id, object) {
        try {
            if (isNaN(id)) throw new Error("El id ingresado es inválido");

            const data = await this.getAll();
            const objectFound = data.find(x => x.id === parseInt(id));
            if (objectFound) {
                const indexProductFound = data.indexOf(objectFound);
                data.splice(indexProductFound, 1, {...objectFound, ...object, id : parseInt(id)});
                await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data));
            } else {
                throw new Error("El id ingresado no existe.");
            }
        }
        catch (error) {
            throw new Error(error);
        }
      }
}
