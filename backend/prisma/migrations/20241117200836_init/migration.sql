-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre_usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "confirmado" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "token_confirmacion" TEXT,
    "fecha_expiracion_token" TIMESTAMP(3),
    "codigo_2fa" TEXT,
    "fecha_expiracion_2fa" TIMESTAMP(3),
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,
    "rol_id" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "grupo_etnico" TEXT,
    "habilidades" JSONB,
    "avatar" BYTEA,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuestionario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Cuestionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" SERIAL NOT NULL,
    "cuestionario_id" INTEGER NOT NULL,
    "enunciado" TEXT NOT NULL,
    "texto_ayuda" TEXT,
    "tipo_pregunta" TEXT NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opcion" (
    "id" SERIAL NOT NULL,
    "pregunta_id" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "Opcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RespuestaEstudiante" (
    "id" SERIAL NOT NULL,
    "estudiante_id" INTEGER NOT NULL,
    "pregunta_id" INTEGER NOT NULL,
    "opcion_id" INTEGER,
    "respuesta_abierta" TEXT,
    "fecha_respuesta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "RespuestaEstudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultadoCuestionario" (
    "id" SERIAL NOT NULL,
    "estudiante_id" INTEGER NOT NULL,
    "cuestionario_id" INTEGER NOT NULL,
    "resultado" JSONB NOT NULL,
    "fecha_resultado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "ResultadoCuestionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autenticacion2FA" (
    "usuario_id" INTEGER NOT NULL,
    "codigo_2fa" TEXT NOT NULL,
    "expiracion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Autenticacion2FA_pkey" PRIMARY KEY ("usuario_id","codigo_2fa")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombre_usuario_key" ON "Usuario"("nombre_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_usuario_id_key" ON "Estudiante"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_cuestionario_id_fkey" FOREIGN KEY ("cuestionario_id") REFERENCES "Cuestionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opcion" ADD CONSTRAINT "Opcion_pregunta_id_fkey" FOREIGN KEY ("pregunta_id") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespuestaEstudiante" ADD CONSTRAINT "RespuestaEstudiante_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespuestaEstudiante" ADD CONSTRAINT "RespuestaEstudiante_pregunta_id_fkey" FOREIGN KEY ("pregunta_id") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespuestaEstudiante" ADD CONSTRAINT "RespuestaEstudiante_opcion_id_fkey" FOREIGN KEY ("opcion_id") REFERENCES "Opcion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespuestaEstudiante" ADD CONSTRAINT "RespuestaEstudiante_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoCuestionario" ADD CONSTRAINT "ResultadoCuestionario_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoCuestionario" ADD CONSTRAINT "ResultadoCuestionario_cuestionario_id_fkey" FOREIGN KEY ("cuestionario_id") REFERENCES "Cuestionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoCuestionario" ADD CONSTRAINT "ResultadoCuestionario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Autenticacion2FA" ADD CONSTRAINT "Autenticacion2FA_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
