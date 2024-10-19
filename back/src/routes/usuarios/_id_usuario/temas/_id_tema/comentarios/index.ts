import { Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";
import * as comentarioService from "../../../../../../services/comentarios.js";
import {
  CommentSchema,
  CommentType,
  IdComentarioSchema,
  putCommentSchema,
  PutCommentType,
} from "../../../../../../types/comentario.js";
import { IdUsuarioSchema } from "../../../../../../types/usuario.js";
import { IdTema } from "../../../../../../types/tema.js";

const UsuarioRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      tags: ["comentarios"],
      summary: "Listado de comentarios de la tema.",
      params: Type.Intersect([IdUsuarioSchema, IdTema]),
      response: {
        200: {
          description: "Lista de comentarios de la tema.",
          content: {
            "application/json": {
              schema: Type.Array(CommentSchema),
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const { id_tema } = request.params as { id_tema: number };
      return comentarioService.findAll(id_tema);
    },
  });

  fastify.post("/", {
    schema: {
      tags: ["comentarios"],
      summary: "Crear comentario de la tema.",
      params: Type.Intersect([IdUsuarioSchema, IdTema]),
      body: CommentSchema,
      response: {
        201: {
          description: "Comentario creado.",
          content: {
            "application/json": {
              schema: CommentSchema,
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const comentario = request.body as CommentType;
      const IdTema = comentario.id_tema;
      const idUsuario = comentario.id_usuario;
      const descripcion = comentario.descripcion;
      return comentarioService.create(IdTema, idUsuario, descripcion);
    },
  });

  fastify.put("/:id", {
    schema: {
      tags: ["comentarios"],
      summary: "Modificar comentario de la tema.",
      params: Type.Intersect([IdUsuarioSchema, IdTema, IdComentarioSchema]),
      body: putCommentSchema,
      response: {
        201: {
          description: "Comentario modificado.",
          content: {
            "application/json": {
              schema: putCommentSchema,
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    handler: async function (request) {
      const comentario = request.body as PutCommentType;
      const IdTema = comentario.id_tema;
      const id_comentario = comentario.id_comentario;
      const descripcion = comentario.descripcion;
      return comentarioService.modify(IdTema, id_comentario, descripcion);
    },
  });

  fastify.delete("/:id", {
    schema: {
      tags: ["comentarios"],
      summary: "Eliminar comentario de la tema.",
      params: Type.Intersect([IdUsuarioSchema, IdTema, IdComentarioSchema]),
      response: {
        204: {
          description: "Comentario eliminado.",
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    handler: async function (request) {
      const { id_tema } = request.params as { id_tema: number };
      const { id_comentario } = request.params as { id_comentario: number };
      return comentarioService.erase(id_tema, id_comentario);
    },
  });
};

export default UsuarioRoutes;
