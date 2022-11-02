const fs = require('fs');

class Contenedor{

    constructor(fileName){
        this.fileName = fileName;
    }

    async save(object){ 
        try
        {
            const data = await this.getAll();
            let idMax = 0;
            data.forEach(element => {
                if (element.id > idMax)
                    idMax = element.id;
            });
            idMax++;

            const newObject = { title: object.title, price: object.price, thumbnail: object.thumbnail, id: idMax }
            data.push(newObject);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data));

            return `Item ${idMax} agregado exitosamente!`;
        }
        catch (error)
        {
            return error;
        }
    }

    async getById(id){
        try
        {
            const data = await this.getAll();
            const objectFound = data.find(x => x.id === id);

            return objectFound ?? null;
        }
        catch (error)
        {
            return error;
        }
    }
    async getAll(){
        try
        {
            const result = await fs.promises.readFile(this.fileName);
            const data = await JSON.parse(result);
            
            return data;
        }
        catch (error)
        {
            return error
        }
    }
    async deleteById(id){
        try
        {
            if (isNaN(id)) throw new Error("El id ingresado es inválido");

            const data = await this.getAll();
            const objectFound = data.find(x => x.id === id);
            if (objectFound)
            {
                const newData = data.filter(x => x.id !== id);
              
                await fs.promises.writeFile(this.fileName, JSON.stringify(newData));
                
                return "Registro eliminado exitosamente";
            }else{
                throw new Error("El id ingresado no existe.");
            }
        }
        catch (error)
        {
            return error
        }
    }

    async deleteAll(){
        try
        {
            await fs.promises.writeFile(this.fileName, "");
        }
        catch (error)
        {
            return error;
        }
    }
}

module.exports = {Contenedor}