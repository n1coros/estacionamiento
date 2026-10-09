USE `estacionamiento`;

INSERT INTO `tipo_vehiculos` (`nombre`, `preciohora`, `preciodia`, `preciomes`) VALUES
('Moto', 1000, 8000,  60000), 
('Auto', 2000, 15000, 120000),  
('Camioneta', 2500, 18000, 150000); 

INSERT INTO `plazas` (`codigo`, `seccion`, `estado`) VALUES
('A-01', 'A', 'Disponible'),   
('A-02', 'A', 'Ocupada'),        
('A-03', 'A', 'Disponible'),      
('B-01', 'B', 'Disponible'),      
('B-02', 'B', 'Mantenimiento'),  
('B-03', 'B', 'Ocupada');      

INSERT INTO `vehiculo` (`patente`, `color`, `marca`, `tipo_vehiculos_idtipo`) VALUES
('ABC123', 'Rojo',   'Toyota',    2),  
('XYZ789', 'Negro',  'Honda',     1),  
('JKL456', 'Blanco', 'Ford',      3),  
('MNO321', 'Azul',   'Chevrolet', 2), 
('PQR654', 'Gris',   'Yamaha',    1); 

INSERT INTO `ticketsregistros` (`fecha`, `fentrada`, `fsalida`, `horas`, `total`, `plazas_idplazas`, `vehiculo_idvehiculo`) VALUES
('2026-09-29', '08:00:00', NULL,       NULL, NULL,  2, 1), 
('2026-09-29', '09:15:00', NULL,       NULL, NULL,  6, 2),
('2026-09-28', '10:00:00', '13:00:00', 3,    7500,  1, 3), 
('2026-09-29', '07:00:00', '09:00:00', 2,    4000,  3, 4),
('2026-09-29', '06:30:00', '07:30:00', 1,    1000,  4, 5);  

INSERT INTO `pagos` (`monto`, `metodopago`, `ticketsregistros_idticketsregistros`) VALUES
(7500, 'Efectivo',     3), 
(4000, 'Tarjeta',      4),
(1000, 'Transferencia', 5); 