import "./Snackbar.css";

interface SnackbarProps {
  type: "error" | "success" | "info";
  message: string;
}

const Snackbar: React.FunctionComponent<SnackbarProps> = (props) => {
  const { type, message } = props;
  return (
    <div
      className={
        type === "error"
          ? "snackbar error"
          : type === "success"
          ? "snackbar success"
          : "snackbar info"
      }
    >
      <p>{message}</p>
    </div>
  );
};

export default Snackbar;
