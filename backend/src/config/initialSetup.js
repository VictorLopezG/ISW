"use strict";
import User from "../entity/user.entity.js";
import Mesa from "../entity/mesa.entity.js";
import Producto from "../entity/producto.entity.js"
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const mesaRepository = AppDataSource.getRepository(Mesa);

    const productoRepository = AppDataSource.getRepository(Producto)

    const countM = await mesaRepository.count();

    const count = await userRepository.count();

    const countP = await productoRepository.count();

    if (count > 0 && countM > 0 && countP > 0) return;

    if (count == 0) {
      await Promise.all([
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Diego Alexis Salazar Jara",
            rut: "21.308.770-3",
            email: "administrador2024@gmail.cl",
            password: await encryptPassword("admin1234"),
            rol: "administrador",
          }),
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Diego Sebastián Ampuero Belmar",
            rut: "21.151.897-9",
            email: "usuario1.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          })
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Alexander Benjamín Marcelo Carrasco Fuentes",
            rut: "20.630.735-8",
            email: "usuario2.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          }),
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Pablo Andrés Castillo Fernández",
            rut: "20.738.450-K",
            email: "usuario3.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          }),
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Felipe Andrés Henríquez Zapata",
            rut: "20.976.635-3",
            email: "usuario4.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          }),
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Diego Alexis Meza Ortega",
            rut: "21.172.447-1",
            email: "usuario5.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          }),
        ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Juan Pablo Rosas Martin",
            rut: "20.738.415-1",
            email: "usuario6.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          }),
        ),
      ]);
    }

    if (countM == 0) {
      await Promise.all([mesaRepository.save(
        mesaRepository.create({
          descripcion: "1",
          capacidad: "4",
        }),
      )]);
    }

    if (countP == 0) {
      await Promise.all([
        productoRepository.save(
          productoRepository.create({
            nombre: "papas fritas",
            valor: "2000",
            stock: "10",
            categoria: "plato de fondo"
          }),
        ),
        productoRepository.save(
          productoRepository.create({
            nombre: "helado",
            valor: "1000",
            stock: "10",
            categoria: "postre"
          }),
        ),
        productoRepository.save(
          productoRepository.create({
            nombre: "crema de esparragos",
            valor: "1000",
            stock: "10",
            categoria: "entrada"
          }),
        ),
        productoRepository.save(
          productoRepository.create({
            nombre: "pepsi",
            valor: "2000",
            stock: "10",
            categoria: "bebestible"
          }),
        ),
        productoRepository.save(
          productoRepository.create({
            nombre: "ensalada chilena",
            valor: "1500",
            stock: "10",
            categoria: "ensalada"
          }),
        ),
      ]);
    }

    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

export { createUsers };