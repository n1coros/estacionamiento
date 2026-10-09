-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema estacionamiento
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema estacionamiento
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `estacionamiento` DEFAULT CHARACTER SET utf8 ;
USE `estacionamiento` ;

-- -----------------------------------------------------
-- Table `estacionamiento`.`tipo_vehiculos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estacionamiento`.`tipo_vehiculos` (
  `idtipo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `preciohora` INT(10) NULL,
  `preciodia` INT(10) NULL,
  `preciomes` INT(10) NULL,
  PRIMARY KEY (`idtipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estacionamiento`.`vehiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estacionamiento`.`vehiculo` (
  `idvehiculo` INT NOT NULL AUTO_INCREMENT,
  `patente` VARCHAR(10) NOT NULL,
  `color` VARCHAR(15) NULL,
  `marca` VARCHAR(20) NULL,
  `tipo_vehiculos_idtipo` INT NOT NULL,
  PRIMARY KEY (`idvehiculo`),
  UNIQUE INDEX `patente_UNIQUE` (`patente` ASC),
  INDEX `fk_vehiculo_tipo_vehiculos_idx` (`tipo_vehiculos_idtipo` ASC),
  CONSTRAINT `fk_vehiculo_tipo_vehiculos`
    FOREIGN KEY (`tipo_vehiculos_idtipo`)
    REFERENCES `estacionamiento`.`tipo_vehiculos` (`idtipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estacionamiento`.`plazas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estacionamiento`.`plazas` (
  `idplazas` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(15) NOT NULL,
  `seccion` VARCHAR(10) NOT NULL,
  `estado` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idplazas`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estacionamiento`.`ticketsregistros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estacionamiento`.`ticketsregistros` (
  `idticketsregistros` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `fentrada` TIME NOT NULL,
  `fsalida` TIME NULL,
  `horas` INT NULL,
  `total` INT NULL,
  `plazas_idplazas` INT NOT NULL,
  `vehiculo_idvehiculo` INT NOT NULL,
  PRIMARY KEY (`idticketsregistros`),
  INDEX `fk_ticketsregistros_plazas1_idx` (`plazas_idplazas` ASC),
  INDEX `fk_ticketsregistros_vehiculo1_idx` (`vehiculo_idvehiculo` ASC),
  CONSTRAINT `fk_ticketsregistros_plazas1`
    FOREIGN KEY (`plazas_idplazas`)
    REFERENCES `estacionamiento`.`plazas` (`idplazas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ticketsregistros_vehiculo1`
    FOREIGN KEY (`vehiculo_idvehiculo`)
    REFERENCES `estacionamiento`.`vehiculo` (`idvehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estacionamiento`.`pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estacionamiento`.`pagos` (
  `idpagos` INT NOT NULL AUTO_INCREMENT,
  `monto` FLOAT NOT NULL,
  `metodopago` VARCHAR(45) NOT NULL,
  `ticketsregistros_idticketsregistros` INT NOT NULL,
  PRIMARY KEY (`idpagos`),
  INDEX `fk_pagos_ticketsregistros1_idx` (`ticketsregistros_idticketsregistros` ASC),
  UNIQUE INDEX `idpagos_UNIQUE` (`idpagos` ASC),
  CONSTRAINT `fk_pagos_ticketsregistros1`
    FOREIGN KEY (`ticketsregistros_idticketsregistros`)
    REFERENCES `estacionamiento`.`ticketsregistros` (`idticketsregistros`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estacionamiento`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estacionamiento`.`clientes` (
  `idclientes` INT NOT NULL,
  `nombre` NVARCHAR(25) NULL,
  `telefono` VARCHAR(12) NULL,
  `estadosuscripcion` VARCHAR(20) NULL,
  PRIMARY KEY (`idclientes`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
