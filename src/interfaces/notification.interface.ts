export default interface INotification {
  type: "error" | "success" | "info";
  message: string;
  duration?:number
}
