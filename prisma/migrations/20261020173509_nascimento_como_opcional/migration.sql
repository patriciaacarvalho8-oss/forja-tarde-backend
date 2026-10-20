-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matricula" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" DATETIME,
    "email" TEXT NOT NULL,
    "telefone" INTEGER,
    "endereco" TEXT
);
INSERT INTO "new_Aluno" ("cpf", "email", "endereco", "id", "matricula", "nascimento", "nome", "telefone") SELECT "cpf", "email", "endereco", "id", "matricula", "nascimento", "nome", "telefone" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
CREATE UNIQUE INDEX "Aluno_cpf_key" ON "Aluno"("cpf");
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
CREATE TABLE "new_Funcionario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "nascimento" DATETIME,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" INTEGER,
    "endereco" TEXT
);
INSERT INTO "new_Funcionario" ("cargo", "cpf", "email", "endereco", "id", "nascimento", "nome", "senha", "telefone") SELECT "cargo", "cpf", "email", "endereco", "id", "nascimento", "nome", "senha", "telefone" FROM "Funcionario";
DROP TABLE "Funcionario";
ALTER TABLE "new_Funcionario" RENAME TO "Funcionario";
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");
CREATE UNIQUE INDEX "Funcionario_cpf_key" ON "Funcionario"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
