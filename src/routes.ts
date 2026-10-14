import { Router } from 'express';
import cursoController from "./controllers/cursos";
import matriculasController from './controllers/matriculas';
import funcionarioController from './controllers/funcionario';
import alunoController from "./controllers/aluno";
import { authentication } from './middlewares/authentication';
import { isAdminOrHimself } from './middlewares/permissions';
import { isAdmin } from './middlewares/permissions';


// Inicializa o router
const routes = Router();

// Rota inicial para verificar se o servidor esta rodando
routes.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello World!" });
});

// Rotas de alunos 
routes.get("/alunos", authentication, alunoController.list);
routes.get("/alunos/:id", authentication, alunoController.getById);
routes.post("/alunos", authentication, alunoController.create);
routes.put("/alunos/:id", authentication, alunoController.update);
routes.delete("/alunos/:id", authentication, alunoController.delete);

// Rotas de cursos 
routes.get("/cursos", authentication, cursoController.list);
routes.get("/cursos/:id", authentication, cursoController.getById);
routes.post("/cursos", authentication, cursoController.create);
routes.put("/cursos/:id", authentication, cursoController.update);
routes.delete("/cursos/:id", authentication, cursoController.delete);

// Rotas de matriculas 
routes.post("/matriculas/:id", authentication, matriculasController.create);
routes.delete("/matriculas/:id", authentication, matriculasController.delete);

// Rotas de funcionarios
routes.post("/login", funcionarioController.login);
routes.get("/funcionarios", authentication, isAdminOrHimself, funcionarioController.list);
routes.get("/funcionarios/:id", authentication, isAdminOrHimself, funcionarioController.getById);
routes.post("/funcionarios", authentication, isAdmin, funcionarioController.create);
routes.put("/funcionarios/:id", authentication, isAdminOrHimself, funcionarioController.update);
routes.delete("/funcionarios/:id", authentication, isAdminOrHimself, funcionarioController.delete);

export default routes;