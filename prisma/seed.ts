import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";

async function main() {
    const funcionario = await prisma.funcionario.create({
        data: {
            nome: "admin",
            email: "admin@gmail.com",
            cargo: "admin",
            cpf: "123456789",
            nascimento: new Date("02/20/2010"),
            endereco: "rua, 0",
            telefone: 1234566787,
            senha: bcrypt.hashSync("123456", +process.env.BCRYPT_RUNDS!),
        },
    });

    console.info("Funcionario criado:", funcionario);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })