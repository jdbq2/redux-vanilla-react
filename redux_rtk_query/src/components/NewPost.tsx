import { useForm, SubmitHandler } from "react-hook-form";
import { PostInput } from "../interface/Post";
import { useAddNewPostMutation } from "../app/services/postAPI";

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInput>();
  const [createPost, { isLoading }] = useAddNewPostMutation();

  const onSubmit: SubmitHandler<PostInput> = (data) => {
    createPost(data);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h1>Create Post</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}>
        <input
          type="text"
          id="title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>El titulo es obligatorio</span>}
        <input
          type="text"
          id="body"
          {...register("body", { required: true })}
        />
        {errors.body && <span>El contenido es obligatorio</span>}
        {isLoading ? <p>Loading...</p> : <button type="submit">Guardar</button>}
      </form>
    </div>
  );
};

export default NewPost;
