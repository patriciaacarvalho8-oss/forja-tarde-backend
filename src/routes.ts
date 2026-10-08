import { Router } from 'express';
import cursoController from "./controllers/cursos";
import matriculasController from './controllers/matriculas';
import funcionarioController from './controllers/funcionario';
import alunoController from "./controllers/aluno";


// Inicializa o router
const routes = Router();

// Rota inicial para verificar se o servidor esta rodando
routes.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello World!" });
});

// Rotas de alunos 
routes.get("/alunos", alunoController.list);
routes.get("/alunos/:id", alunoController.getById);
routes.post("/alunos", alunoController.create);
routes.put("/alunos/:id", alunoController.update);
routes.delete("/alunos/:id", alunoController.delete);

// Rotas de cursos 
routes.get("/cursos", cursoController.list);
routes.get("/cursos/:id", cursoController.getById);
routes.post("/cursos", cursoController.create);
routes.put("/cursos/:id", cursoController.update);
routes.delete("/cursos/:id", cursoController.delete);

// Rotas de matriculas 
routes.post("/matriculas/:id", matriculasController.create);
routes.delete("/matriculas/:id", matriculasController.delete);

// Rotas de funcionarios
routes.post("/login", funcionarioController.login);

export default routes;