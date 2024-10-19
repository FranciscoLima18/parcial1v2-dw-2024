import { Static, Type } from "@sinclair/typebox";

export const CommentSchema = Type.Object(
  {
    id_tema: Type.Number({ description: "Identificador único del tema." }),
    id_usuario: Type.Number({
      description: "Identificador único del usuario",
    }),
    descripcion: Type.String({ description: "Comentario del usuario" }),
  },
  {
    examples: [
      {
        id_tema: 1,
        id_usuario: 1,
        descripcion: "Esto es una descripción.",
        comentario: "Comentario del tema 1",
      },
    ],
  }
);

export type CommentType = Static<typeof CommentSchema>;

export const IdComentarioSchema = Type.Object(
  {
    id_comentario: Type.String({
      description: "Identificador único del comentario",
    }),
  },
  { examples: [{ id_comentario: 1 }] }
);

export const putCommentSchema = Type.Object({
  id_comentario: Type.Number({
    description: "Identificador único del comentario",
  }),
  descripcion: Type.String({ description: "Comentario del usuario" }),
  id_tema: Type.Number({ description: "Identificador único del tema." }),
});
export type PutCommentType = Static<typeof putCommentSchema>;
