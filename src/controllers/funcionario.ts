
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default {
    login: async (request: Request, response: Response) => {
        try {
            const { email, senha } = request.body;

            if (!email || !senha) {
                return response.status(400).json("Dados imcompletos");
            }

            const funcionario = await prisma.funcionario.findUnique({
                where: {
                    email,
                },
            });

            if (!funcionario || !bcrypt.compareSync(senha, funcionario.senha)) {
                return response.status(404).json("Email ou senha invalidos");
            }

            const token = jwt.sign(
                { id: funcionario.id, cargo: funcionario.cargo },
                process.env.JWT_SECRET!,
                {
                    expiresIn: "1d",
                },
            );

            return response.status(200).json(token);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    list: async (request: Request, response: Response) => {
        try {
            const funcionarios = await prisma.funcionario.findMany();

            return response.status(200).json(funcionarios);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    getById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const funcionario = await prisma.funcionario.findUnique({
                where: {
                    id: +id,
                },
            });

            return response.status(200).json(funcionario);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    create: async (request: Request, response: Response) => {
        try {
            const { nome, nascimento, email, senha, cargo, telefone, endereco, cpf } =
                request.body;

            if (!nome || !email || !senha || !cargo) {
                return response.status(400).json("Dados do funcionário incompletos");
            }

            const funcionario = await prisma.funcionario.create({
                data: {
                    nome,
                    nascimento: new Date(nascimento),
                    cpf,
                    email,
                    senha: bcrypt.hashSync(senha, 10),
                    cargo,
                    telefone,
                    endereco,
                    
                },
            });

            return response.status(201).json(funcionario);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, nascimento, email, senha, cargo, telefone, endereco, cpf } =
                request.body;

            const funcionario = await prisma.funcionario.update({
                where: {
                    id: +id,
                },
                data: {
                    nome,
                    nascimento: nascimento ? new Date(nascimento) : undefined,
                    email,
                    senha: senha ? bcrypt.hashSync(senha, 10) : undefined,
                    cargo,
                    telefone,
                    endereco,
                    cpf,
                },
            });

            return response.status(200).json(funcionario);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const funcionario = await prisma.funcionario.delete({
                where: {
                    id: +id,
                },
            });

            return response.status(200).json(funcionario);
        } catch (e) {
            return handleErrors(e, response);
        }
    },
};
