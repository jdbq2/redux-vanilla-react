import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { Post, PostInput } from "../../interface/Post";

export const postApi = createApi({
  reducerPath: "postApi",
  /**
   En el baseQuery podemos usar el retry para establece la candidad maxima de reintentos antes de considerar que la llamada 
   tuvo un error.
   */
  baseQuery: retry(fetchBaseQuery({ baseUrl: "http://localhost:3005" }), {
    maxRetries: 2,
  }),
  refetchOnMountOrArgChange: true, // Si queremos qeu haga una peticion al endpoint en background y actualice las diferencias
  refetchOnFocus: true, // hace el refetch en background de la data cuando se hace foco de nuevo en la pantalla
  keepUnusedDataFor: 120, // Tiempo que queremos tener la data del query en cache
  tagTypes: ["Posts"], // Tags para nuestras consultas
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], null>({
      query: () => `/posts`,
      providesTags: ["Posts"], //Del listado de tagTypes le asignamos uno a la consulta
    }),

    getPostById: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
    }),

    addNewPost: builder.mutation<void, PostInput>({
      query: (newPost) => ({
        url: "/posts",
        method: "post",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostsQuery,
  useAddNewPostMutation,
} = postApi;
