import { Router } from 'express';

// Inicializa o router
const routes = Router();

// Rota inicial para verificar se o servidor esta rodando
routes.get("/", (request, response) => {
    return response.status(200).json({ message: "Hello World!" });
});

routes.get("/number", (request, response) => {
    const randomNumber = Math.floor(Math.random() * 100);
    return response.status(200).json({ randomNumber });
});

routes.get("/fibonacci/:quantidade", (request, response) => {
  const quantidade = Number(request.params.quantidade);

  const fibonacci = [0, 1];

  for (let i = 2; i < quantidade; i++) {
    fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
  }

  return response.status(200).json({
    quantidade,
    fibonacci
  });
});

routes.get("/fatorial/:numero", (request, response) => {
    const numero = Number(request.params.numero);

    let resultado = 1;

    for (let i = 1; i <= numero; i++) {
        resultado = resultado * i;
    }

    return response.status(200).json(resultado);
});
export default routes;