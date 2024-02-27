import "./Snackbar.css";

interface SnackbarProps {
  type: "error" | "success" | "info";
  message: string;
}

const Snackbar: React.FunctionComponent<SnackbarProps> = (props) => {
  const { type, message } = props;
  return (
    <div className="snackbar-container">
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
    </div>
  );
};

export default Snackbar;
