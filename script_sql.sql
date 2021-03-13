CREATE TABLE public.clientes
(
    id_cliente integer NOT NULL primary key generated always as identity,
    nombre_cliente character varying(50) COLLATE pg_catalog."default" NOT NULL,
    apellido_cliente character varying(50) COLLATE pg_catalog."default" NOT NULL
);

INSERT INTO public.clientes( nombre_cliente, apellido_cliente) VALUES ('Antonio', 'Espinoza');

CREATE TABLE public.marcas
(
    id_marca integer NOT NULL primary key generated always as identity,
    nombre_marca character varying COLLATE pg_catalog."default" NOT NULL,
    descripcion_marca character varying COLLATE pg_catalog."default" NOT NULL
);


INSERT INTO public.marcas( nombre_marca, descripcion_marca) VALUES ('Xiaomi', 'Marca de celulares');

	CREATE TABLE public.porcentaje
(
    id_porcentaje integer NOT NULL primary key generated always as identity,
    cantidad_porcentaje numeric(10,2) NOT NULL,
    fecha_modificacion_porcentaje date NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO public.porcentaje( cantidad_porcentaje) VALUES ('16.00');

CREATE TABLE public.articulos
(
    id_articulo integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nombre_articulo character varying COLLATE pg_catalog."default" NOT NULL,
    precio_articulo numeric(10,2) NOT NULL,
    id_marca integer NOT NULL,
    CONSTRAINT articulos_pkey PRIMARY KEY (id_articulo),
    CONSTRAINT articulos_id_marca_fkey FOREIGN KEY (id_marca)
        REFERENCES public.marcas (id_marca) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

INSERT INTO public.articulos( nombre_articulo, precio_articulo, id_marca) VALUES ('Celular', 1200, 1);

CREATE TABLE public.ventas
(
    id_venta integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    total_venta numeric(10,2) NOT NULL,
    fecha_venta date NOT NULL DEFAULT CURRENT_DATE,
    id_cliente integer NOT NULL,
    CONSTRAINT ventas_pkey PRIMARY KEY (id_venta),
    CONSTRAINT ventas_id_cliente_fkey FOREIGN KEY (id_cliente)
        REFERENCES public.clientes (id_cliente) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);



	