import articulo from '../models/articulos.js';

const httpArticulos = {

    postInsertar: async (req, res) => {
        try {
            const { nombre, precio, stock, categoria, estado } = req.body;
            const nuevoArticulo = new articulo({ nombre, precio, stock, categoria, estado });
            await nuevoArticulo.save()
            res.json(nuevoArticulo)
        } catch (error) {
            res.status(400).json({ error: 'Error al crear nuevo articulo' })
            console.log(error);
        }
    },

    putModificar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, precio, stock, categoria, estado } = req.body;
            let update = { nombre, precio, stock, categoria, estado }
            const articuloModificado = await articulo.findByIdAndUpdate(id, update, { new: true });
            res.json(articuloModificado)
        } catch (error) {
            res.status(400).json({ error: 'Error al modificar articulo' })
            console.log(error);
        }
    },

    getListarTodos: async (req, res) => {
        try {
            const listarTodos = await articulo.find().populate('categoria', 'nombre').exec();
            res.json(listarTodos)
        } catch (error) {
            res.status(400).json({ error: 'Error al obtener lista de articulos' })
            console.log(error);
        }
    },

    getListarXId: async (req, res) => {
        try {
            const listarXId = await articulo.findById(req.params.id)
            res.json(listarXId)
        } catch (error) {
            res.status(400).json({ error: 'Error al obtener articulo por id' })
            console.log(error);
        }
    },

    getListarActivos: async (req, res) => {
        try {
            const listarActivos = await articulo.find({ estado: 1 })
            res.json(listarActivos)
        } catch (error) {
            res.status(400).json({ error: 'Error al obtener lista de articulos activos' })
            console.log(error);
        }
    },

    getListarInactivos: async (req, res) => {
        try {
            const listarInactivos = await articulo.find({ estado: 0 })
            res.json(listarInactivos)
        } catch (error) {
            res.status(400).json({ error: 'Error al obtener lista de articulos inactivos' })
            console.log(error);
        }
    },

    putModificarInactivo: async (req, res) => {
        try {
            const { id } = req.params;
            const articuloInactivo = await articulo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json(articuloInactivo)
        } catch (error) {
            res.status(400).json({ error: 'Error al desactivar articulo' })
            console.log(error);
        }
    },

    putModificarActivo: async (req, res) => {
        try {
            const { id } = req.params;
            const articuloActivo = await articulo.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json(articuloActivo)
        }
        catch (error) {
            res.status(400).json({ error: 'Error al activar articulo' })
            console.log(error);
        }
    },

    getListarStock: async (req, res) => {
        try {
            // Obtener todos los artículos desde la base de datos
            const articulos = await articulo.find(); // Falta este await en tu código original
    
            // Calcular el total del stock
            const totalStock = articulos.reduce((total, articulo) => total + articulo.stock, 0);
    
            res.json({ totalStock });
        } catch (error) {
            res.status(400).json({ error: 'Error al obtener stock' });
            console.log(error);
        }
    }     
}

export default httpArticulos