/**
 * Komponent för att visa toast-notiser från favorites store
 * - Visar titel och undertitel med ikon
 * - Renderas endast när toast-state finns
 *
 * @author Ivana
 * @returns {JSX.Element|null}
 */

import { Check } from "lucide-react";
import useFavoritesStore from "../../stores/useFavoritesStore";
import "./Toast.css";

function Toast() {
  const toast = useFavoritesStore((state) => state.toast);

  if (!toast) {
    return null;
  }

  return (
    <div className="toast">
      <div className="toast__icon">
        <Check size={20} />
      </div>
      <div className="toast__text">
        <p className="toast__title">{toast.title}</p>
        <p className="toast__subtitle">{toast.subtitle}</p>
      </div>
    </div>
  );
}

export default Toast;
