import { ErrorState } from "./ErrorState";
import { parseMessages } from "@/shared/errors/parseMessageResponse";
import { AlertType } from "@/shared/lib/Notify";

export const getErrorState = (error: any): ErrorState => {
  return {
    message: parseMessages(error),
    status: false,
    type: error.type,
    alertType: error.level === "warning" ? AlertType.WARNING : AlertType.ERROR,
  };
};
