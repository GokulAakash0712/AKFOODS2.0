import { connect } from "mongoose";

export const dbConnect = () => {
  connect(process.env.MONGO_URI!).then(
    () => console.log("DB Connected Successfully!"),
    (error) => console.log(error)
  );
};
