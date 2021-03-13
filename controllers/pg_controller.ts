import { Request, response, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from "../database/pg_database";

export const consultaClientes = async (req: Request, res: Response): Promise<Response> => {
    try {
        res.header("Access-Control-Allow-Origin", "*");

        const response: QueryResult = await pool.query('SELECT * FROM clientes order by id_cliente');
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json({
            mensaje: 'Error al realizar la consulta!',
            statusCode: 0
        });
    }
};

export const consultaArticulos = async (req: Request, res: Response): Promise<Response> => {
    try {
        res.header("Access-Control-Allow-Origin", "*");

        const response: QueryResult = await pool.query('SELECT A.id_articulo, A.nombre_articulo, M.nombre_marca AS marca_articulo, A.precio_articulo from articulos A INNER JOIN marcas M ON A.id_marca = M.id_marca ORDER BY A.id_articulo;');
        //const response: QueryResult = await pool.query('SELECT * FROM articulos order by id_');
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json({
            mensaje: 'Error al realizar la consulta!',
            statusCode: 0
        });
    }
};

export const consultaVentas = async (req: Request, res: Response): Promise<Response> => {
    try {
        res.header("Access-Control-Allow-Origin", "*");

        const response: QueryResult = await pool.query('SELECT V.id_venta, V.id_cliente, C.nombre_cliente, C.apellido_cliente, V.total_venta, V.fecha_venta FROM Ventas V INNER JOIN clientes C ON C.id_cliente = V.id_cliente');
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json({
            mensaje: 'Error al realizar la consulta!',
            statusCode: 0
        });
    }
};

export const consultaMarcas = async (req: Request, res: Response): Promise<Response> => {
    try {
        res.header("Access-Control-Allow-Origin", "*");

        const response: QueryResult = await pool.query('SELECT * FROM marcas order by id_marca');
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json({
            mensaje: 'Error al realizar la consulta!',
            statusCode: 0
        });
    }
};

export const consultaPorcentaje = async (req: Request, res: Response): Promise<Response> => {
    try {
        res.header("Access-Control-Allow-Origin", "*");

        const response: QueryResult = await pool.query('SELECT * FROM porcentaje;');
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json({
            mensaje: 'Error al realizar la consulta!',
            statusCode: 0
        });
    }
};


export const gaurdarVenta = async (req: Request, res: Response): Promise<Response> => {
    try {
        const total_venta = parseInt(req.body.total_venta);
        const id_cliente = parseInt(req.body.id_cliente);

        const response: QueryResult = await pool.query('INSERT INTO public.ventas(total_venta, id_cliente) VALUES (' + total_venta + ',' + id_cliente + ');');
        res.header('Access-Control-Allow-Origin: *');

        return res.status(200).json({
            mensaje: 'Venta guardada correctamente!',
            statusCode: 1
        });

    } catch (e) {
        return res.status(500).json({
            mensaje: 'Error al guardar venta!',
            statusCode: 0
        });
    }
};

export const guardarCliente = async (req: Request, res: Response): Promise<Response> => {
    try {
        const nombre_cliente = req.body.nombre_cliente;
        const apellido_cliente = req.body.apellido_cliente;

        const response: QueryResult = await pool.query("INSERT INTO clientes (nombre_cliente, apellido_cliente) VALUES ('" + nombre_cliente + "','" + apellido_cliente + "');");
        res.header('Access-Control-Allow-Origin: *');

        return res.status(200).json({
            mensaje: 'Cliente guardado correctamente!',
            statusCode: 1
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            mensaje: 'Error al guardar el cliente!',
            statusCode: 0
        });
    }
};

export const guardarArticulo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const nombre_articulo = req.body.nombre_articulo;
        const id_marca = req.body.id_marca;
        const precio_articulo = req.body.precio_articulo;

        const response: QueryResult = await pool.query("INSERT INTO public.articulos( nombre_articulo, precio_articulo, id_marca)VALUES ('" + nombre_articulo + "', '" + precio_articulo + "', " + id_marca + ");");
        res.header('Access-Control-Allow-Origin: *');

        return res.status(200).json({
            mensaje: 'Articulo guardado correctamente!',
            statusCode: 1
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            mensaje: 'Error al guardar el articulo!',
            statusCode: 0
        });
    }
};

export const guardarMarca = async (req: Request, res: Response): Promise<Response> => {
    try {
        const nombre_marca = req.body.nombre_marca;
        const descripcion_marca = req.body.descripcion_marca;

        const response: QueryResult = await pool.query("INSERT INTO marcas (nombre_marca, descripcion_marca) VALUES ('" + nombre_marca + "','" + descripcion_marca + "');");
        res.header('Access-Control-Allow-Origin: *');

        return res.status(200).json({
            mensaje: 'Marca guardado correctamente!',
            statusCode: 1
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            mensaje: 'Error al guardar el cliente!',
            statusCode: 0
        });
    }
};


export const actualizarPorcentaje = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cantidad_porcentaje = req.body.cantidad_porcentaje;

        const response: QueryResult = await pool.query("UPDATE porcentaje SET cantidad_porcentaje= '" + cantidad_porcentaje + "' WHERE id_porcentaje = 1;");
        res.header('Access-Control-Allow-Origin: *');

        return res.status(200).json({
            mensaje: 'Porcentaje actualizado correctamente!',
            statusCode: 1
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            mensaje: 'Error al guardar el articulo!',
            statusCode: 0
        });
    }
};
