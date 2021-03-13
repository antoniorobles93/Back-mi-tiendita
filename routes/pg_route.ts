import {Router} from 'express';
const router = Router();

import { consultaClientes, consultaArticulos, consultaVentas, consultaMarcas, consultaPorcentaje ,gaurdarVenta, guardarCliente, guardarArticulo, guardarMarca, actualizarPorcentaje } from "../controllers/pg_controller";

router.get('/api/clientes', consultaClientes);
router.get('/api/articulos', consultaArticulos);
router.get('/api/ventas', consultaVentas);
router.get('/api/marcas', consultaMarcas);
router.get('/api/porcentaje', consultaPorcentaje);

router.post('/api/guardarventa', gaurdarVenta);
router.post('/api/guardarcliente', guardarCliente);
router.post('/api/guardararticulo', guardarArticulo);
router.post('/api/guardarmarca', guardarMarca);
router.post('/api/actualizarporcentaje', actualizarPorcentaje);

export default router;